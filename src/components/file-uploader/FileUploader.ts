
import { Constants, Log, Util, Web } from '@/components/util';
import ApiResource from '../core/ApiResource';
import Event from '../core/Event';
import FileWrapper from './FileWrapper';


export interface FileUploaderConfig {

    uploadUrl: string;
    maxFiles: number;
    maxFileSize: number;
    allowedExtensions?: RegExp;

}


export default class FileUploader {


    public uploads!: FileWrapper[];

    private uploadUrl: string;

    private maxFiles: number;

    private maxFileSize: number;

    private allowedExtensions?: RegExp;

    private onSuccessCallback?: (data: any) => void;

    private onErrorCallback?: (error: any) => void;

    
    public constructor(
        private config: FileUploaderConfig,
    ) {
        this.uploads = [];
        this.uploadUrl = config.uploadUrl;
        this.maxFiles = config.maxFiles;
        this.maxFileSize = config.maxFileSize;
        this.allowedExtensions = config.allowedExtensions || Constants.defaultFileUploadExtensions;
    }


    public fileChange(event: any) {
        const files: FileList = event.target.files;
        
        for (let i = 0; i < files.length; i++) {
            if (this.uploads.length === this.maxFiles) {
                Log.warn('Max number of uploads reached');
                return;
            }

            const file = files.item(i) as File;

            if (this.allowedExtensions && !this.allowedExtensions.test(file.name.toLowerCase())) {
                Log.warn(`Unsupported file format: ${file.name}`);
                return;
            }

            if (this.maxFileSize < file.size) {
                Log.warn(`Max File Size exceeded: ${file.size}`);
                return;
            }

            if (!this.containsFile(file)) {
                Log.info(`Adding File for upload ${file.name}`);

                const fileWrapper = new FileWrapper(file, ApiResource.create());
                this.uploads.push(fileWrapper);
                this.uploadFile(fileWrapper);
            } else {
                Log.info(`Upload File ${file.name} already added. Skipping...`)
            }
        }
    }


    public uploadFile(fileWrapper: FileWrapper) {
        const resource = fileWrapper.getResource();

        resource.error = '';
        resource.loading = true;

        const formData = new FormData();
        formData.append("file", fileWrapper.getFile());

        Web.post(
            this.uploadUrl, 

            formData, 

            (response) => {
                resource.loading = false;

                Log.info(`Uploaded File ${fileWrapper.getFile().name}. Reference: ${JSON.stringify(response.data)}`);
                fileWrapper.setReference(response.data);

                Event.EventTrigger.trigger(Constants.fileUploadEvent, fileWrapper.getReference());
                if (this.onSuccessCallback) {
                    this.onSuccessCallback(response.data);
                }
            },

            (error) => {
                resource.loading = false;
                resource.error = Util.extractError(error);

                Event.EventTrigger.trigger(Constants.fileUploadErrorEvent, resource.error);

                if (this.onErrorCallback) {
                    this.onErrorCallback(resource.error);
                }
            },

            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }


    public onSuccess(callback: (data: any) => void) {
        this.onSuccessCallback = callback;
    }

    public onError(callback: (error: any) => void) {
        this.onErrorCallback = callback;
    }


    public removeFile(file: File) {
        Log.info(`Removing File: ${file.name}`);
        this.uploads = this.uploads.filter((val) => val.getFile().name !== file.name);
        Event.EventTrigger.trigger(Constants.fileUploadEvent);
    }

    public removeAllFiles() {
        this.uploads = [];
        Event.EventTrigger.trigger(Constants.fileUploadEvent);
    }
    

    private containsFile(file: File) {
        return this.uploads.filter((val) => val.getFile().name === file.name).length > 0;
    }


}



