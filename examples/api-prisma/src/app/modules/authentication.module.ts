import { Module } from '@nestjs/common';
import { AuthenticationModule as TrxnAuthenticationModule } from '@traxionnestjs-authentication';

import { UserModule } from './user.module';

@Module({
  imports: [
    TrxnAuthenticationModule.register({
      imports: [UserModule],
      jwtModuleOptions: {
        secret: 'secret',
      },
    }),
  ],
  exports: [TrxnAuthenticationModule],
})
export class AuthenticationModule {}
