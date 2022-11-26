
import { Constants, Log, Util, Web } from '@/components/util';
import ApiResource from '../core/ApiResource';
import Event from '../core/Event';
import FileWrapper from './FileWrapper';


export default class FileUploader {


    public uploads!: FileWrapper[];


    public constructor(
        private uploadUrl: string,
        private maxFiles: number,
        private allowedExtensions: RegExp,
        private maxFileSize: number,
    ) {
        this.uploads = [];
    }


    public fileChange(event: any) {
        let files: FileList = event.target.files;
        
        for (let i = 0; i < files.length; i++) {
            if (this.uploads.length === this.maxFiles) {
                Log.warn('Max number of uploads reached');
                return;
            }

            let file = files.item(i) as File;

            if (!this.allowedExtensions.test(file.name.toLowerCase())) {
                Log.warn(`Unsupported file format: ${file.name}`);
                return;
            }

            if (this.maxFileSize < file.size) {
                Log.warn(`Max File Size exceeded: ${file.size}`);
                return;
            }

            if (!this.containsFile(file)) {
                Log.info(`Adding File for upload ${file.name}`);

                let fileWrapper = new FileWrapper(file, ApiResource.create());
                this.uploads.push(fileWrapper);
                this.uploadFile(fileWrapper);
            } else {
                Log.info(`Upload File ${file.name} already added. Skipping...`)
            }
        }
    }


    public uploadFile(fileWrapper: FileWrapper) {
        let resource = fileWrapper.getResource();

        resource.error = '';
        resource.loading = true;

        let formData = new FormData();
        formData.append("file", fileWrapper.getFile());

        Web.post(
            this.uploadUrl, 

            formData, 

            (response) => {
                resource.loading = false;

                Log.info(`Uploaded File ${fileWrapper.getFile().name}. Reference: ${response.data}`);
                fileWrapper.setReference(response.data);

                Event.EventTrigger.trigger(Constants.fileUploadEvent, fileWrapper.getReference());
            },

            (error) => {
                resource.loading = false;
                resource.error = Util.extractError(error);

                Event.EventTrigger.trigger(Constants.fileUploadErrorEvent, resource.error);
            },

            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }


    public removeFile(file: File) {
        Log.info(`Removing File: ${file.name}`);
        this.uploads = this.uploads.filter((val) => val.getFile().name !== file.name);
        Event.EventTrigger.trigger(Constants.fileUploadEvent);
    }
    

    private containsFile(file: File) {
        return this.uploads.filter((val) => val.getFile().name === file.name).length > 0;
    }


}


