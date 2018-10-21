import { Injectable } from '@angular/core';

import { BaseService } from 'src/shared/services/base.service';
import { ConfigService } from 'src/shared/utils/config.service';

@Injectable()

export class AppService extends BaseService {

  baseUrl = '';

  constructor(private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.getApiURI();
  }
}
