import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Transaction, TransactionSchema } from '../transactions/schemas/transaction.schema';
import { Challenge, ChallengeSchema } from '../challenges/schemas/challenge.schema';
import { Reward, RewardSchema } from '../rewards/schemas/reward.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: Challenge.name, schema: ChallengeSchema },
      { name: Reward.name, schema: RewardSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}