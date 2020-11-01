import { IncomingForm as Original } from 'formidable';

declare module 'formidable-serverless' {
    export class IncomingForm extends Original {}
}
