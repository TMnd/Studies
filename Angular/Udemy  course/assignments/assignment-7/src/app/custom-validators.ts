import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidators {
    static forbidenProjectName(control: FormControl): {[s: string]: boolean} {
        if (control.value === 'test') {
          return {'nameIsForbidden': true};
        }
        return {};
    }

    static asyncInvalidProjectName(control: FormControl): Promise<any> | Observable<any>{
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            if(control.value === 'test2'){
              resolve({'nameIsForbidden': true});
            } else {
              resolve(null);
            }
          }, 1000);
        });
        return promise;
    }
}