import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType} from "@angular/common/http";
import { tap } from "rxjs";

export class LogginInterceptor implements HttpInterceptor {


    intercept(req : HttpRequest<any>, next : HttpHandler){
        console.log('Outgoing Request');
        return next.handle(req).pipe(tap(event=>{
            if(event.type === HttpEventType.Response){
                console.log('Incoming Response');
                console.log(req.body);
            }
        }));
    }
}