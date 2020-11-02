declare module 'formidable-serverless' {
    import { IncomingForm as Original } from 'formidable';

    class IncomingForm extends Original {}
}
