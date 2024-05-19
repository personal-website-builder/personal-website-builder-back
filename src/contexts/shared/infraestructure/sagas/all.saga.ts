import { Injectable } from '@nestjs/common';
import { ICommand, Saga } from '@nestjs/cqrs';
import { filter, Observable, tap } from 'rxjs';

@Injectable()
export class AllSaga {
  @Saga()
  all = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      tap((e) => console.log('EVENT', e)),
      filter(() => false),
    );
  };
}
