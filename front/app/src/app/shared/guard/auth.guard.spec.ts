import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {

    it('should create an instance', () => {
        let component = new AuthGuard(null, null);

        expect(component).toBeTruthy();
    });
});
