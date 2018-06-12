import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


export abstract class BaseService {

    constructor() { }

    protected handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // client error
      } else {
        // backend error
        const modelStateErrors: string[] = [];
        for (const key in error.error) {
          if (error.error[key]) {
            modelStateErrors.push(error.error[key]);
          }
        }
        return throwError(modelStateErrors);
      }
      return throwError('Произошло что-то плохое; Пожалуйста, повторите попытку позже.');
  }
}
