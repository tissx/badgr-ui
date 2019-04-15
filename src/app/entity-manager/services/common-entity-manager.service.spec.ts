import { async } from '@angular/core/testing';
import {CommonEntityManager} from './common-entity-manager.service';

describe('CommonEntityManager', () => {
  let service;

  const injector: any = {
    // mock properties here 
  }

  beforeEach(() => {
    service = new CommonEntityManager(injector);
  });

});
