import { Observable, throwError } from 'rxjs';


export abstract class BaseService {

    constructor() { }

    protected handleError(error: any) {

      const applicationError = error.headers.get('Application-Error');

      if (applicationError) {
        return throwError(applicationError);
      }

      let modelStateErrors = '';

      if (!error.type) {
        // tslint:disable-next-line:forin
        for (const key in error.error) {
          modelStateErrors += key + ': ' + error.error[key] + '\n';
        }
      }

      modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
      return throwError(modelStateErrors || 'Server error');
  }
}
