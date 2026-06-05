import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GamificationData {
  @Field(() => Int)
  xp: number;

  @Field(() => Int)
  level: number;

  @Field()
  title: string;
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => GamificationData)
  gamification: GamificationData;
}
