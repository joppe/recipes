export type UploadResult = UploadSuccessResult | UploadErrorResult;

export type UploadSuccessResult = {
  filename: string;
  error: null;
};

export type UploadErrorResult = {
  filename: null;
  error: string;
};

export type Uploader = (file: File) => Promise<UploadResult>;
