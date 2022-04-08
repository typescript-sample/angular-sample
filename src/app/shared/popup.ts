import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService, ComponentLoaderFactory, PositioningService} from 'ngx-bootstrap';

@Injectable()
export class PopupService {
  bsModalRef: BsModalRef;

  constructor (
    private bsModalService: BsModalService,
  ) {
  }

  show(conponent: any, item: any) {
    const initialState = { data: Object.assign({}, item)};
    return this.bsModalService.show(conponent, {
      initialState,
      class: 'modal-dialog-centered modal-dialog-log'
    });
  }
}

export const DependenciesServiceProviders = [PopupService, BsModalService, ComponentLoaderFactory, PositioningService];
