import { AbilityBuilder } from '@casl/ability';
import { Prisma } from '@prisma/client';
import {
  Action,
  DefinePermissions,
  DefinePublicPermissions,
} from '@trxn/nestjs-casl';

import {
  AppAbility,
  userOwnershipPermission,
  UserSelectOwnershipIds as userSelect,
} from '@traxion/casl';

export type Roles = 'admin' | 'user';

export const userSelectWithOwnership = Prisma.validator<Prisma.UserArgs>()({
  select: {
    ...userSelect.select,
    role: {
      select: {
        ...userSelect.select.role.select,
        name: true,
      },
    },
  },
});

export type UserWithOwnershipIds = Prisma.UserGetPayload<
  typeof userSelectWithOwnership
>;

export const customSelect = userSelectWithOwnership.select;

export const rolePermissions: Record<
  Roles,
  DefinePermissions<AbilityBuilder<AppAbility>, UserWithOwnershipIds>
> = {
  user: (abilities, user) => {
    userOwnershipPermission(abilities, user);
  },
  admin: (abilities) => {
    abilities.can(Action.Manage, 'all');
  },
};

export const publicPermissions: DefinePublicPermissions<
  AbilityBuilder<AppAbility>
> = () => {
  // Public has not right
};
