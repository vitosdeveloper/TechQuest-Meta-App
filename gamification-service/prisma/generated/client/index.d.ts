
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model UserXp
 * 
 */
export type UserXp = $Result.DefaultSelection<Prisma.$UserXpPayload>
/**
 * Model ProcessedEvent
 * 
 */
export type ProcessedEvent = $Result.DefaultSelection<Prisma.$ProcessedEventPayload>
/**
 * Model CompletedLesson
 * 
 */
export type CompletedLesson = $Result.DefaultSelection<Prisma.$CompletedLessonPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserXps
 * const userXps = await prisma.userXp.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more UserXps
   * const userXps = await prisma.userXp.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.userXp`: Exposes CRUD operations for the **UserXp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserXps
    * const userXps = await prisma.userXp.findMany()
    * ```
    */
  get userXp(): Prisma.UserXpDelegate<ExtArgs>;

  /**
   * `prisma.processedEvent`: Exposes CRUD operations for the **ProcessedEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessedEvents
    * const processedEvents = await prisma.processedEvent.findMany()
    * ```
    */
  get processedEvent(): Prisma.ProcessedEventDelegate<ExtArgs>;

  /**
   * `prisma.completedLesson`: Exposes CRUD operations for the **CompletedLesson** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompletedLessons
    * const completedLessons = await prisma.completedLesson.findMany()
    * ```
    */
  get completedLesson(): Prisma.CompletedLessonDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    UserXp: 'UserXp',
    ProcessedEvent: 'ProcessedEvent',
    CompletedLesson: 'CompletedLesson'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "userXp" | "processedEvent" | "completedLesson"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      UserXp: {
        payload: Prisma.$UserXpPayload<ExtArgs>
        fields: Prisma.UserXpFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserXpFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserXpPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserXpFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserXpPayload>
          }
          findFirst: {
            args: Prisma.UserXpFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserXpPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserXpFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserXpPayload>
          }
          findMany: {
            args: Prisma.UserXpFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserXpPayload>[]
          }
          create: {
            args: Prisma.UserXpCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserXpPayload>
          }
          createMany: {
            args: Prisma.UserXpCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserXpCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserXpPayload>[]
          }
          delete: {
            args: Prisma.UserXpDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserXpPayload>
          }
          update: {
            args: Prisma.UserXpUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserXpPayload>
          }
          deleteMany: {
            args: Prisma.UserXpDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserXpUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserXpUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserXpPayload>
          }
          aggregate: {
            args: Prisma.UserXpAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserXp>
          }
          groupBy: {
            args: Prisma.UserXpGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserXpGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserXpCountArgs<ExtArgs>
            result: $Utils.Optional<UserXpCountAggregateOutputType> | number
          }
        }
      }
      ProcessedEvent: {
        payload: Prisma.$ProcessedEventPayload<ExtArgs>
        fields: Prisma.ProcessedEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessedEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessedEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          findFirst: {
            args: Prisma.ProcessedEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessedEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          findMany: {
            args: Prisma.ProcessedEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>[]
          }
          create: {
            args: Prisma.ProcessedEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          createMany: {
            args: Prisma.ProcessedEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessedEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>[]
          }
          delete: {
            args: Prisma.ProcessedEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          update: {
            args: Prisma.ProcessedEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          deleteMany: {
            args: Prisma.ProcessedEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessedEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProcessedEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          aggregate: {
            args: Prisma.ProcessedEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessedEvent>
          }
          groupBy: {
            args: Prisma.ProcessedEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessedEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessedEventCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessedEventCountAggregateOutputType> | number
          }
        }
      }
      CompletedLesson: {
        payload: Prisma.$CompletedLessonPayload<ExtArgs>
        fields: Prisma.CompletedLessonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompletedLessonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletedLessonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompletedLessonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletedLessonPayload>
          }
          findFirst: {
            args: Prisma.CompletedLessonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletedLessonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompletedLessonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletedLessonPayload>
          }
          findMany: {
            args: Prisma.CompletedLessonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletedLessonPayload>[]
          }
          create: {
            args: Prisma.CompletedLessonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletedLessonPayload>
          }
          createMany: {
            args: Prisma.CompletedLessonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompletedLessonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletedLessonPayload>[]
          }
          delete: {
            args: Prisma.CompletedLessonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletedLessonPayload>
          }
          update: {
            args: Prisma.CompletedLessonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletedLessonPayload>
          }
          deleteMany: {
            args: Prisma.CompletedLessonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompletedLessonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompletedLessonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletedLessonPayload>
          }
          aggregate: {
            args: Prisma.CompletedLessonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompletedLesson>
          }
          groupBy: {
            args: Prisma.CompletedLessonGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompletedLessonGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompletedLessonCountArgs<ExtArgs>
            result: $Utils.Optional<CompletedLessonCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model UserXp
   */

  export type AggregateUserXp = {
    _count: UserXpCountAggregateOutputType | null
    _avg: UserXpAvgAggregateOutputType | null
    _sum: UserXpSumAggregateOutputType | null
    _min: UserXpMinAggregateOutputType | null
    _max: UserXpMaxAggregateOutputType | null
  }

  export type UserXpAvgAggregateOutputType = {
    xp: number | null
    level: number | null
  }

  export type UserXpSumAggregateOutputType = {
    xp: number | null
    level: number | null
  }

  export type UserXpMinAggregateOutputType = {
    userId: string | null
    xp: number | null
    level: number | null
  }

  export type UserXpMaxAggregateOutputType = {
    userId: string | null
    xp: number | null
    level: number | null
  }

  export type UserXpCountAggregateOutputType = {
    userId: number
    xp: number
    level: number
    _all: number
  }


  export type UserXpAvgAggregateInputType = {
    xp?: true
    level?: true
  }

  export type UserXpSumAggregateInputType = {
    xp?: true
    level?: true
  }

  export type UserXpMinAggregateInputType = {
    userId?: true
    xp?: true
    level?: true
  }

  export type UserXpMaxAggregateInputType = {
    userId?: true
    xp?: true
    level?: true
  }

  export type UserXpCountAggregateInputType = {
    userId?: true
    xp?: true
    level?: true
    _all?: true
  }

  export type UserXpAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserXp to aggregate.
     */
    where?: UserXpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserXps to fetch.
     */
    orderBy?: UserXpOrderByWithRelationInput | UserXpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserXpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserXps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserXps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserXps
    **/
    _count?: true | UserXpCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserXpAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserXpSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserXpMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserXpMaxAggregateInputType
  }

  export type GetUserXpAggregateType<T extends UserXpAggregateArgs> = {
        [P in keyof T & keyof AggregateUserXp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserXp[P]>
      : GetScalarType<T[P], AggregateUserXp[P]>
  }




  export type UserXpGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserXpWhereInput
    orderBy?: UserXpOrderByWithAggregationInput | UserXpOrderByWithAggregationInput[]
    by: UserXpScalarFieldEnum[] | UserXpScalarFieldEnum
    having?: UserXpScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserXpCountAggregateInputType | true
    _avg?: UserXpAvgAggregateInputType
    _sum?: UserXpSumAggregateInputType
    _min?: UserXpMinAggregateInputType
    _max?: UserXpMaxAggregateInputType
  }

  export type UserXpGroupByOutputType = {
    userId: string
    xp: number
    level: number
    _count: UserXpCountAggregateOutputType | null
    _avg: UserXpAvgAggregateOutputType | null
    _sum: UserXpSumAggregateOutputType | null
    _min: UserXpMinAggregateOutputType | null
    _max: UserXpMaxAggregateOutputType | null
  }

  type GetUserXpGroupByPayload<T extends UserXpGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserXpGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserXpGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserXpGroupByOutputType[P]>
            : GetScalarType<T[P], UserXpGroupByOutputType[P]>
        }
      >
    >


  export type UserXpSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    xp?: boolean
    level?: boolean
  }, ExtArgs["result"]["userXp"]>

  export type UserXpSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    xp?: boolean
    level?: boolean
  }, ExtArgs["result"]["userXp"]>

  export type UserXpSelectScalar = {
    userId?: boolean
    xp?: boolean
    level?: boolean
  }


  export type $UserXpPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserXp"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      xp: number
      level: number
    }, ExtArgs["result"]["userXp"]>
    composites: {}
  }

  type UserXpGetPayload<S extends boolean | null | undefined | UserXpDefaultArgs> = $Result.GetResult<Prisma.$UserXpPayload, S>

  type UserXpCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserXpFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserXpCountAggregateInputType | true
    }

  export interface UserXpDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserXp'], meta: { name: 'UserXp' } }
    /**
     * Find zero or one UserXp that matches the filter.
     * @param {UserXpFindUniqueArgs} args - Arguments to find a UserXp
     * @example
     * // Get one UserXp
     * const userXp = await prisma.userXp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserXpFindUniqueArgs>(args: SelectSubset<T, UserXpFindUniqueArgs<ExtArgs>>): Prisma__UserXpClient<$Result.GetResult<Prisma.$UserXpPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserXp that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserXpFindUniqueOrThrowArgs} args - Arguments to find a UserXp
     * @example
     * // Get one UserXp
     * const userXp = await prisma.userXp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserXpFindUniqueOrThrowArgs>(args: SelectSubset<T, UserXpFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserXpClient<$Result.GetResult<Prisma.$UserXpPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserXp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserXpFindFirstArgs} args - Arguments to find a UserXp
     * @example
     * // Get one UserXp
     * const userXp = await prisma.userXp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserXpFindFirstArgs>(args?: SelectSubset<T, UserXpFindFirstArgs<ExtArgs>>): Prisma__UserXpClient<$Result.GetResult<Prisma.$UserXpPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserXp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserXpFindFirstOrThrowArgs} args - Arguments to find a UserXp
     * @example
     * // Get one UserXp
     * const userXp = await prisma.userXp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserXpFindFirstOrThrowArgs>(args?: SelectSubset<T, UserXpFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserXpClient<$Result.GetResult<Prisma.$UserXpPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserXps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserXpFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserXps
     * const userXps = await prisma.userXp.findMany()
     * 
     * // Get first 10 UserXps
     * const userXps = await prisma.userXp.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userXpWithUserIdOnly = await prisma.userXp.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserXpFindManyArgs>(args?: SelectSubset<T, UserXpFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserXpPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserXp.
     * @param {UserXpCreateArgs} args - Arguments to create a UserXp.
     * @example
     * // Create one UserXp
     * const UserXp = await prisma.userXp.create({
     *   data: {
     *     // ... data to create a UserXp
     *   }
     * })
     * 
     */
    create<T extends UserXpCreateArgs>(args: SelectSubset<T, UserXpCreateArgs<ExtArgs>>): Prisma__UserXpClient<$Result.GetResult<Prisma.$UserXpPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserXps.
     * @param {UserXpCreateManyArgs} args - Arguments to create many UserXps.
     * @example
     * // Create many UserXps
     * const userXp = await prisma.userXp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserXpCreateManyArgs>(args?: SelectSubset<T, UserXpCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserXps and returns the data saved in the database.
     * @param {UserXpCreateManyAndReturnArgs} args - Arguments to create many UserXps.
     * @example
     * // Create many UserXps
     * const userXp = await prisma.userXp.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserXps and only return the `userId`
     * const userXpWithUserIdOnly = await prisma.userXp.createManyAndReturn({ 
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserXpCreateManyAndReturnArgs>(args?: SelectSubset<T, UserXpCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserXpPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserXp.
     * @param {UserXpDeleteArgs} args - Arguments to delete one UserXp.
     * @example
     * // Delete one UserXp
     * const UserXp = await prisma.userXp.delete({
     *   where: {
     *     // ... filter to delete one UserXp
     *   }
     * })
     * 
     */
    delete<T extends UserXpDeleteArgs>(args: SelectSubset<T, UserXpDeleteArgs<ExtArgs>>): Prisma__UserXpClient<$Result.GetResult<Prisma.$UserXpPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserXp.
     * @param {UserXpUpdateArgs} args - Arguments to update one UserXp.
     * @example
     * // Update one UserXp
     * const userXp = await prisma.userXp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserXpUpdateArgs>(args: SelectSubset<T, UserXpUpdateArgs<ExtArgs>>): Prisma__UserXpClient<$Result.GetResult<Prisma.$UserXpPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserXps.
     * @param {UserXpDeleteManyArgs} args - Arguments to filter UserXps to delete.
     * @example
     * // Delete a few UserXps
     * const { count } = await prisma.userXp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserXpDeleteManyArgs>(args?: SelectSubset<T, UserXpDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserXps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserXpUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserXps
     * const userXp = await prisma.userXp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserXpUpdateManyArgs>(args: SelectSubset<T, UserXpUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserXp.
     * @param {UserXpUpsertArgs} args - Arguments to update or create a UserXp.
     * @example
     * // Update or create a UserXp
     * const userXp = await prisma.userXp.upsert({
     *   create: {
     *     // ... data to create a UserXp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserXp we want to update
     *   }
     * })
     */
    upsert<T extends UserXpUpsertArgs>(args: SelectSubset<T, UserXpUpsertArgs<ExtArgs>>): Prisma__UserXpClient<$Result.GetResult<Prisma.$UserXpPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserXps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserXpCountArgs} args - Arguments to filter UserXps to count.
     * @example
     * // Count the number of UserXps
     * const count = await prisma.userXp.count({
     *   where: {
     *     // ... the filter for the UserXps we want to count
     *   }
     * })
    **/
    count<T extends UserXpCountArgs>(
      args?: Subset<T, UserXpCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserXpCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserXp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserXpAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserXpAggregateArgs>(args: Subset<T, UserXpAggregateArgs>): Prisma.PrismaPromise<GetUserXpAggregateType<T>>

    /**
     * Group by UserXp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserXpGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserXpGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserXpGroupByArgs['orderBy'] }
        : { orderBy?: UserXpGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserXpGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserXpGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserXp model
   */
  readonly fields: UserXpFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserXp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserXpClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserXp model
   */ 
  interface UserXpFieldRefs {
    readonly userId: FieldRef<"UserXp", 'String'>
    readonly xp: FieldRef<"UserXp", 'Int'>
    readonly level: FieldRef<"UserXp", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UserXp findUnique
   */
  export type UserXpFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserXp
     */
    select?: UserXpSelect<ExtArgs> | null
    /**
     * Filter, which UserXp to fetch.
     */
    where: UserXpWhereUniqueInput
  }

  /**
   * UserXp findUniqueOrThrow
   */
  export type UserXpFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserXp
     */
    select?: UserXpSelect<ExtArgs> | null
    /**
     * Filter, which UserXp to fetch.
     */
    where: UserXpWhereUniqueInput
  }

  /**
   * UserXp findFirst
   */
  export type UserXpFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserXp
     */
    select?: UserXpSelect<ExtArgs> | null
    /**
     * Filter, which UserXp to fetch.
     */
    where?: UserXpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserXps to fetch.
     */
    orderBy?: UserXpOrderByWithRelationInput | UserXpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserXps.
     */
    cursor?: UserXpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserXps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserXps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserXps.
     */
    distinct?: UserXpScalarFieldEnum | UserXpScalarFieldEnum[]
  }

  /**
   * UserXp findFirstOrThrow
   */
  export type UserXpFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserXp
     */
    select?: UserXpSelect<ExtArgs> | null
    /**
     * Filter, which UserXp to fetch.
     */
    where?: UserXpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserXps to fetch.
     */
    orderBy?: UserXpOrderByWithRelationInput | UserXpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserXps.
     */
    cursor?: UserXpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserXps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserXps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserXps.
     */
    distinct?: UserXpScalarFieldEnum | UserXpScalarFieldEnum[]
  }

  /**
   * UserXp findMany
   */
  export type UserXpFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserXp
     */
    select?: UserXpSelect<ExtArgs> | null
    /**
     * Filter, which UserXps to fetch.
     */
    where?: UserXpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserXps to fetch.
     */
    orderBy?: UserXpOrderByWithRelationInput | UserXpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserXps.
     */
    cursor?: UserXpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserXps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserXps.
     */
    skip?: number
    distinct?: UserXpScalarFieldEnum | UserXpScalarFieldEnum[]
  }

  /**
   * UserXp create
   */
  export type UserXpCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserXp
     */
    select?: UserXpSelect<ExtArgs> | null
    /**
     * The data needed to create a UserXp.
     */
    data: XOR<UserXpCreateInput, UserXpUncheckedCreateInput>
  }

  /**
   * UserXp createMany
   */
  export type UserXpCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserXps.
     */
    data: UserXpCreateManyInput | UserXpCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserXp createManyAndReturn
   */
  export type UserXpCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserXp
     */
    select?: UserXpSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserXps.
     */
    data: UserXpCreateManyInput | UserXpCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserXp update
   */
  export type UserXpUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserXp
     */
    select?: UserXpSelect<ExtArgs> | null
    /**
     * The data needed to update a UserXp.
     */
    data: XOR<UserXpUpdateInput, UserXpUncheckedUpdateInput>
    /**
     * Choose, which UserXp to update.
     */
    where: UserXpWhereUniqueInput
  }

  /**
   * UserXp updateMany
   */
  export type UserXpUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserXps.
     */
    data: XOR<UserXpUpdateManyMutationInput, UserXpUncheckedUpdateManyInput>
    /**
     * Filter which UserXps to update
     */
    where?: UserXpWhereInput
  }

  /**
   * UserXp upsert
   */
  export type UserXpUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserXp
     */
    select?: UserXpSelect<ExtArgs> | null
    /**
     * The filter to search for the UserXp to update in case it exists.
     */
    where: UserXpWhereUniqueInput
    /**
     * In case the UserXp found by the `where` argument doesn't exist, create a new UserXp with this data.
     */
    create: XOR<UserXpCreateInput, UserXpUncheckedCreateInput>
    /**
     * In case the UserXp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserXpUpdateInput, UserXpUncheckedUpdateInput>
  }

  /**
   * UserXp delete
   */
  export type UserXpDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserXp
     */
    select?: UserXpSelect<ExtArgs> | null
    /**
     * Filter which UserXp to delete.
     */
    where: UserXpWhereUniqueInput
  }

  /**
   * UserXp deleteMany
   */
  export type UserXpDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserXps to delete
     */
    where?: UserXpWhereInput
  }

  /**
   * UserXp without action
   */
  export type UserXpDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserXp
     */
    select?: UserXpSelect<ExtArgs> | null
  }


  /**
   * Model ProcessedEvent
   */

  export type AggregateProcessedEvent = {
    _count: ProcessedEventCountAggregateOutputType | null
    _min: ProcessedEventMinAggregateOutputType | null
    _max: ProcessedEventMaxAggregateOutputType | null
  }

  export type ProcessedEventMinAggregateOutputType = {
    eventId: string | null
    type: string | null
    processedAt: Date | null
  }

  export type ProcessedEventMaxAggregateOutputType = {
    eventId: string | null
    type: string | null
    processedAt: Date | null
  }

  export type ProcessedEventCountAggregateOutputType = {
    eventId: number
    type: number
    processedAt: number
    _all: number
  }


  export type ProcessedEventMinAggregateInputType = {
    eventId?: true
    type?: true
    processedAt?: true
  }

  export type ProcessedEventMaxAggregateInputType = {
    eventId?: true
    type?: true
    processedAt?: true
  }

  export type ProcessedEventCountAggregateInputType = {
    eventId?: true
    type?: true
    processedAt?: true
    _all?: true
  }

  export type ProcessedEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedEvent to aggregate.
     */
    where?: ProcessedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEvents to fetch.
     */
    orderBy?: ProcessedEventOrderByWithRelationInput | ProcessedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessedEvents
    **/
    _count?: true | ProcessedEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessedEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessedEventMaxAggregateInputType
  }

  export type GetProcessedEventAggregateType<T extends ProcessedEventAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessedEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessedEvent[P]>
      : GetScalarType<T[P], AggregateProcessedEvent[P]>
  }




  export type ProcessedEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedEventWhereInput
    orderBy?: ProcessedEventOrderByWithAggregationInput | ProcessedEventOrderByWithAggregationInput[]
    by: ProcessedEventScalarFieldEnum[] | ProcessedEventScalarFieldEnum
    having?: ProcessedEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessedEventCountAggregateInputType | true
    _min?: ProcessedEventMinAggregateInputType
    _max?: ProcessedEventMaxAggregateInputType
  }

  export type ProcessedEventGroupByOutputType = {
    eventId: string
    type: string
    processedAt: Date
    _count: ProcessedEventCountAggregateOutputType | null
    _min: ProcessedEventMinAggregateOutputType | null
    _max: ProcessedEventMaxAggregateOutputType | null
  }

  type GetProcessedEventGroupByPayload<T extends ProcessedEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessedEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessedEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessedEventGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessedEventGroupByOutputType[P]>
        }
      >
    >


  export type ProcessedEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    type?: boolean
    processedAt?: boolean
  }, ExtArgs["result"]["processedEvent"]>

  export type ProcessedEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    type?: boolean
    processedAt?: boolean
  }, ExtArgs["result"]["processedEvent"]>

  export type ProcessedEventSelectScalar = {
    eventId?: boolean
    type?: boolean
    processedAt?: boolean
  }


  export type $ProcessedEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessedEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      eventId: string
      type: string
      processedAt: Date
    }, ExtArgs["result"]["processedEvent"]>
    composites: {}
  }

  type ProcessedEventGetPayload<S extends boolean | null | undefined | ProcessedEventDefaultArgs> = $Result.GetResult<Prisma.$ProcessedEventPayload, S>

  type ProcessedEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProcessedEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProcessedEventCountAggregateInputType | true
    }

  export interface ProcessedEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessedEvent'], meta: { name: 'ProcessedEvent' } }
    /**
     * Find zero or one ProcessedEvent that matches the filter.
     * @param {ProcessedEventFindUniqueArgs} args - Arguments to find a ProcessedEvent
     * @example
     * // Get one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessedEventFindUniqueArgs>(args: SelectSubset<T, ProcessedEventFindUniqueArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProcessedEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProcessedEventFindUniqueOrThrowArgs} args - Arguments to find a ProcessedEvent
     * @example
     * // Get one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessedEventFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessedEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProcessedEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventFindFirstArgs} args - Arguments to find a ProcessedEvent
     * @example
     * // Get one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessedEventFindFirstArgs>(args?: SelectSubset<T, ProcessedEventFindFirstArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProcessedEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventFindFirstOrThrowArgs} args - Arguments to find a ProcessedEvent
     * @example
     * // Get one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessedEventFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessedEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProcessedEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessedEvents
     * const processedEvents = await prisma.processedEvent.findMany()
     * 
     * // Get first 10 ProcessedEvents
     * const processedEvents = await prisma.processedEvent.findMany({ take: 10 })
     * 
     * // Only select the `eventId`
     * const processedEventWithEventIdOnly = await prisma.processedEvent.findMany({ select: { eventId: true } })
     * 
     */
    findMany<T extends ProcessedEventFindManyArgs>(args?: SelectSubset<T, ProcessedEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProcessedEvent.
     * @param {ProcessedEventCreateArgs} args - Arguments to create a ProcessedEvent.
     * @example
     * // Create one ProcessedEvent
     * const ProcessedEvent = await prisma.processedEvent.create({
     *   data: {
     *     // ... data to create a ProcessedEvent
     *   }
     * })
     * 
     */
    create<T extends ProcessedEventCreateArgs>(args: SelectSubset<T, ProcessedEventCreateArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProcessedEvents.
     * @param {ProcessedEventCreateManyArgs} args - Arguments to create many ProcessedEvents.
     * @example
     * // Create many ProcessedEvents
     * const processedEvent = await prisma.processedEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessedEventCreateManyArgs>(args?: SelectSubset<T, ProcessedEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessedEvents and returns the data saved in the database.
     * @param {ProcessedEventCreateManyAndReturnArgs} args - Arguments to create many ProcessedEvents.
     * @example
     * // Create many ProcessedEvents
     * const processedEvent = await prisma.processedEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessedEvents and only return the `eventId`
     * const processedEventWithEventIdOnly = await prisma.processedEvent.createManyAndReturn({ 
     *   select: { eventId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessedEventCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessedEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProcessedEvent.
     * @param {ProcessedEventDeleteArgs} args - Arguments to delete one ProcessedEvent.
     * @example
     * // Delete one ProcessedEvent
     * const ProcessedEvent = await prisma.processedEvent.delete({
     *   where: {
     *     // ... filter to delete one ProcessedEvent
     *   }
     * })
     * 
     */
    delete<T extends ProcessedEventDeleteArgs>(args: SelectSubset<T, ProcessedEventDeleteArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProcessedEvent.
     * @param {ProcessedEventUpdateArgs} args - Arguments to update one ProcessedEvent.
     * @example
     * // Update one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessedEventUpdateArgs>(args: SelectSubset<T, ProcessedEventUpdateArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProcessedEvents.
     * @param {ProcessedEventDeleteManyArgs} args - Arguments to filter ProcessedEvents to delete.
     * @example
     * // Delete a few ProcessedEvents
     * const { count } = await prisma.processedEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessedEventDeleteManyArgs>(args?: SelectSubset<T, ProcessedEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessedEvents
     * const processedEvent = await prisma.processedEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessedEventUpdateManyArgs>(args: SelectSubset<T, ProcessedEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProcessedEvent.
     * @param {ProcessedEventUpsertArgs} args - Arguments to update or create a ProcessedEvent.
     * @example
     * // Update or create a ProcessedEvent
     * const processedEvent = await prisma.processedEvent.upsert({
     *   create: {
     *     // ... data to create a ProcessedEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessedEvent we want to update
     *   }
     * })
     */
    upsert<T extends ProcessedEventUpsertArgs>(args: SelectSubset<T, ProcessedEventUpsertArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProcessedEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventCountArgs} args - Arguments to filter ProcessedEvents to count.
     * @example
     * // Count the number of ProcessedEvents
     * const count = await prisma.processedEvent.count({
     *   where: {
     *     // ... the filter for the ProcessedEvents we want to count
     *   }
     * })
    **/
    count<T extends ProcessedEventCountArgs>(
      args?: Subset<T, ProcessedEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessedEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessedEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessedEventAggregateArgs>(args: Subset<T, ProcessedEventAggregateArgs>): Prisma.PrismaPromise<GetProcessedEventAggregateType<T>>

    /**
     * Group by ProcessedEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessedEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessedEventGroupByArgs['orderBy'] }
        : { orderBy?: ProcessedEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessedEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessedEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessedEvent model
   */
  readonly fields: ProcessedEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessedEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessedEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessedEvent model
   */ 
  interface ProcessedEventFieldRefs {
    readonly eventId: FieldRef<"ProcessedEvent", 'String'>
    readonly type: FieldRef<"ProcessedEvent", 'String'>
    readonly processedAt: FieldRef<"ProcessedEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProcessedEvent findUnique
   */
  export type ProcessedEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Filter, which ProcessedEvent to fetch.
     */
    where: ProcessedEventWhereUniqueInput
  }

  /**
   * ProcessedEvent findUniqueOrThrow
   */
  export type ProcessedEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Filter, which ProcessedEvent to fetch.
     */
    where: ProcessedEventWhereUniqueInput
  }

  /**
   * ProcessedEvent findFirst
   */
  export type ProcessedEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Filter, which ProcessedEvent to fetch.
     */
    where?: ProcessedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEvents to fetch.
     */
    orderBy?: ProcessedEventOrderByWithRelationInput | ProcessedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedEvents.
     */
    cursor?: ProcessedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedEvents.
     */
    distinct?: ProcessedEventScalarFieldEnum | ProcessedEventScalarFieldEnum[]
  }

  /**
   * ProcessedEvent findFirstOrThrow
   */
  export type ProcessedEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Filter, which ProcessedEvent to fetch.
     */
    where?: ProcessedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEvents to fetch.
     */
    orderBy?: ProcessedEventOrderByWithRelationInput | ProcessedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedEvents.
     */
    cursor?: ProcessedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedEvents.
     */
    distinct?: ProcessedEventScalarFieldEnum | ProcessedEventScalarFieldEnum[]
  }

  /**
   * ProcessedEvent findMany
   */
  export type ProcessedEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Filter, which ProcessedEvents to fetch.
     */
    where?: ProcessedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEvents to fetch.
     */
    orderBy?: ProcessedEventOrderByWithRelationInput | ProcessedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessedEvents.
     */
    cursor?: ProcessedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEvents.
     */
    skip?: number
    distinct?: ProcessedEventScalarFieldEnum | ProcessedEventScalarFieldEnum[]
  }

  /**
   * ProcessedEvent create
   */
  export type ProcessedEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * The data needed to create a ProcessedEvent.
     */
    data: XOR<ProcessedEventCreateInput, ProcessedEventUncheckedCreateInput>
  }

  /**
   * ProcessedEvent createMany
   */
  export type ProcessedEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessedEvents.
     */
    data: ProcessedEventCreateManyInput | ProcessedEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedEvent createManyAndReturn
   */
  export type ProcessedEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProcessedEvents.
     */
    data: ProcessedEventCreateManyInput | ProcessedEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedEvent update
   */
  export type ProcessedEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * The data needed to update a ProcessedEvent.
     */
    data: XOR<ProcessedEventUpdateInput, ProcessedEventUncheckedUpdateInput>
    /**
     * Choose, which ProcessedEvent to update.
     */
    where: ProcessedEventWhereUniqueInput
  }

  /**
   * ProcessedEvent updateMany
   */
  export type ProcessedEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessedEvents.
     */
    data: XOR<ProcessedEventUpdateManyMutationInput, ProcessedEventUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedEvents to update
     */
    where?: ProcessedEventWhereInput
  }

  /**
   * ProcessedEvent upsert
   */
  export type ProcessedEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * The filter to search for the ProcessedEvent to update in case it exists.
     */
    where: ProcessedEventWhereUniqueInput
    /**
     * In case the ProcessedEvent found by the `where` argument doesn't exist, create a new ProcessedEvent with this data.
     */
    create: XOR<ProcessedEventCreateInput, ProcessedEventUncheckedCreateInput>
    /**
     * In case the ProcessedEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessedEventUpdateInput, ProcessedEventUncheckedUpdateInput>
  }

  /**
   * ProcessedEvent delete
   */
  export type ProcessedEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Filter which ProcessedEvent to delete.
     */
    where: ProcessedEventWhereUniqueInput
  }

  /**
   * ProcessedEvent deleteMany
   */
  export type ProcessedEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedEvents to delete
     */
    where?: ProcessedEventWhereInput
  }

  /**
   * ProcessedEvent without action
   */
  export type ProcessedEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
  }


  /**
   * Model CompletedLesson
   */

  export type AggregateCompletedLesson = {
    _count: CompletedLessonCountAggregateOutputType | null
    _min: CompletedLessonMinAggregateOutputType | null
    _max: CompletedLessonMaxAggregateOutputType | null
  }

  export type CompletedLessonMinAggregateOutputType = {
    id: string | null
    userId: string | null
    lessonId: string | null
    createdAt: Date | null
  }

  export type CompletedLessonMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    lessonId: string | null
    createdAt: Date | null
  }

  export type CompletedLessonCountAggregateOutputType = {
    id: number
    userId: number
    lessonId: number
    createdAt: number
    _all: number
  }


  export type CompletedLessonMinAggregateInputType = {
    id?: true
    userId?: true
    lessonId?: true
    createdAt?: true
  }

  export type CompletedLessonMaxAggregateInputType = {
    id?: true
    userId?: true
    lessonId?: true
    createdAt?: true
  }

  export type CompletedLessonCountAggregateInputType = {
    id?: true
    userId?: true
    lessonId?: true
    createdAt?: true
    _all?: true
  }

  export type CompletedLessonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompletedLesson to aggregate.
     */
    where?: CompletedLessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompletedLessons to fetch.
     */
    orderBy?: CompletedLessonOrderByWithRelationInput | CompletedLessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompletedLessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompletedLessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompletedLessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompletedLessons
    **/
    _count?: true | CompletedLessonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompletedLessonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompletedLessonMaxAggregateInputType
  }

  export type GetCompletedLessonAggregateType<T extends CompletedLessonAggregateArgs> = {
        [P in keyof T & keyof AggregateCompletedLesson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompletedLesson[P]>
      : GetScalarType<T[P], AggregateCompletedLesson[P]>
  }




  export type CompletedLessonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompletedLessonWhereInput
    orderBy?: CompletedLessonOrderByWithAggregationInput | CompletedLessonOrderByWithAggregationInput[]
    by: CompletedLessonScalarFieldEnum[] | CompletedLessonScalarFieldEnum
    having?: CompletedLessonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompletedLessonCountAggregateInputType | true
    _min?: CompletedLessonMinAggregateInputType
    _max?: CompletedLessonMaxAggregateInputType
  }

  export type CompletedLessonGroupByOutputType = {
    id: string
    userId: string
    lessonId: string
    createdAt: Date
    _count: CompletedLessonCountAggregateOutputType | null
    _min: CompletedLessonMinAggregateOutputType | null
    _max: CompletedLessonMaxAggregateOutputType | null
  }

  type GetCompletedLessonGroupByPayload<T extends CompletedLessonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompletedLessonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompletedLessonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompletedLessonGroupByOutputType[P]>
            : GetScalarType<T[P], CompletedLessonGroupByOutputType[P]>
        }
      >
    >


  export type CompletedLessonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    lessonId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["completedLesson"]>

  export type CompletedLessonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    lessonId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["completedLesson"]>

  export type CompletedLessonSelectScalar = {
    id?: boolean
    userId?: boolean
    lessonId?: boolean
    createdAt?: boolean
  }


  export type $CompletedLessonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompletedLesson"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      lessonId: string
      createdAt: Date
    }, ExtArgs["result"]["completedLesson"]>
    composites: {}
  }

  type CompletedLessonGetPayload<S extends boolean | null | undefined | CompletedLessonDefaultArgs> = $Result.GetResult<Prisma.$CompletedLessonPayload, S>

  type CompletedLessonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CompletedLessonFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CompletedLessonCountAggregateInputType | true
    }

  export interface CompletedLessonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompletedLesson'], meta: { name: 'CompletedLesson' } }
    /**
     * Find zero or one CompletedLesson that matches the filter.
     * @param {CompletedLessonFindUniqueArgs} args - Arguments to find a CompletedLesson
     * @example
     * // Get one CompletedLesson
     * const completedLesson = await prisma.completedLesson.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompletedLessonFindUniqueArgs>(args: SelectSubset<T, CompletedLessonFindUniqueArgs<ExtArgs>>): Prisma__CompletedLessonClient<$Result.GetResult<Prisma.$CompletedLessonPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CompletedLesson that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CompletedLessonFindUniqueOrThrowArgs} args - Arguments to find a CompletedLesson
     * @example
     * // Get one CompletedLesson
     * const completedLesson = await prisma.completedLesson.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompletedLessonFindUniqueOrThrowArgs>(args: SelectSubset<T, CompletedLessonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompletedLessonClient<$Result.GetResult<Prisma.$CompletedLessonPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CompletedLesson that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedLessonFindFirstArgs} args - Arguments to find a CompletedLesson
     * @example
     * // Get one CompletedLesson
     * const completedLesson = await prisma.completedLesson.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompletedLessonFindFirstArgs>(args?: SelectSubset<T, CompletedLessonFindFirstArgs<ExtArgs>>): Prisma__CompletedLessonClient<$Result.GetResult<Prisma.$CompletedLessonPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CompletedLesson that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedLessonFindFirstOrThrowArgs} args - Arguments to find a CompletedLesson
     * @example
     * // Get one CompletedLesson
     * const completedLesson = await prisma.completedLesson.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompletedLessonFindFirstOrThrowArgs>(args?: SelectSubset<T, CompletedLessonFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompletedLessonClient<$Result.GetResult<Prisma.$CompletedLessonPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CompletedLessons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedLessonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompletedLessons
     * const completedLessons = await prisma.completedLesson.findMany()
     * 
     * // Get first 10 CompletedLessons
     * const completedLessons = await prisma.completedLesson.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const completedLessonWithIdOnly = await prisma.completedLesson.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompletedLessonFindManyArgs>(args?: SelectSubset<T, CompletedLessonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompletedLessonPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CompletedLesson.
     * @param {CompletedLessonCreateArgs} args - Arguments to create a CompletedLesson.
     * @example
     * // Create one CompletedLesson
     * const CompletedLesson = await prisma.completedLesson.create({
     *   data: {
     *     // ... data to create a CompletedLesson
     *   }
     * })
     * 
     */
    create<T extends CompletedLessonCreateArgs>(args: SelectSubset<T, CompletedLessonCreateArgs<ExtArgs>>): Prisma__CompletedLessonClient<$Result.GetResult<Prisma.$CompletedLessonPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CompletedLessons.
     * @param {CompletedLessonCreateManyArgs} args - Arguments to create many CompletedLessons.
     * @example
     * // Create many CompletedLessons
     * const completedLesson = await prisma.completedLesson.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompletedLessonCreateManyArgs>(args?: SelectSubset<T, CompletedLessonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompletedLessons and returns the data saved in the database.
     * @param {CompletedLessonCreateManyAndReturnArgs} args - Arguments to create many CompletedLessons.
     * @example
     * // Create many CompletedLessons
     * const completedLesson = await prisma.completedLesson.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompletedLessons and only return the `id`
     * const completedLessonWithIdOnly = await prisma.completedLesson.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompletedLessonCreateManyAndReturnArgs>(args?: SelectSubset<T, CompletedLessonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompletedLessonPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CompletedLesson.
     * @param {CompletedLessonDeleteArgs} args - Arguments to delete one CompletedLesson.
     * @example
     * // Delete one CompletedLesson
     * const CompletedLesson = await prisma.completedLesson.delete({
     *   where: {
     *     // ... filter to delete one CompletedLesson
     *   }
     * })
     * 
     */
    delete<T extends CompletedLessonDeleteArgs>(args: SelectSubset<T, CompletedLessonDeleteArgs<ExtArgs>>): Prisma__CompletedLessonClient<$Result.GetResult<Prisma.$CompletedLessonPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CompletedLesson.
     * @param {CompletedLessonUpdateArgs} args - Arguments to update one CompletedLesson.
     * @example
     * // Update one CompletedLesson
     * const completedLesson = await prisma.completedLesson.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompletedLessonUpdateArgs>(args: SelectSubset<T, CompletedLessonUpdateArgs<ExtArgs>>): Prisma__CompletedLessonClient<$Result.GetResult<Prisma.$CompletedLessonPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CompletedLessons.
     * @param {CompletedLessonDeleteManyArgs} args - Arguments to filter CompletedLessons to delete.
     * @example
     * // Delete a few CompletedLessons
     * const { count } = await prisma.completedLesson.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompletedLessonDeleteManyArgs>(args?: SelectSubset<T, CompletedLessonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompletedLessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedLessonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompletedLessons
     * const completedLesson = await prisma.completedLesson.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompletedLessonUpdateManyArgs>(args: SelectSubset<T, CompletedLessonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CompletedLesson.
     * @param {CompletedLessonUpsertArgs} args - Arguments to update or create a CompletedLesson.
     * @example
     * // Update or create a CompletedLesson
     * const completedLesson = await prisma.completedLesson.upsert({
     *   create: {
     *     // ... data to create a CompletedLesson
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompletedLesson we want to update
     *   }
     * })
     */
    upsert<T extends CompletedLessonUpsertArgs>(args: SelectSubset<T, CompletedLessonUpsertArgs<ExtArgs>>): Prisma__CompletedLessonClient<$Result.GetResult<Prisma.$CompletedLessonPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CompletedLessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedLessonCountArgs} args - Arguments to filter CompletedLessons to count.
     * @example
     * // Count the number of CompletedLessons
     * const count = await prisma.completedLesson.count({
     *   where: {
     *     // ... the filter for the CompletedLessons we want to count
     *   }
     * })
    **/
    count<T extends CompletedLessonCountArgs>(
      args?: Subset<T, CompletedLessonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompletedLessonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompletedLesson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedLessonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompletedLessonAggregateArgs>(args: Subset<T, CompletedLessonAggregateArgs>): Prisma.PrismaPromise<GetCompletedLessonAggregateType<T>>

    /**
     * Group by CompletedLesson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedLessonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompletedLessonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompletedLessonGroupByArgs['orderBy'] }
        : { orderBy?: CompletedLessonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompletedLessonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompletedLessonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompletedLesson model
   */
  readonly fields: CompletedLessonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompletedLesson.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompletedLessonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompletedLesson model
   */ 
  interface CompletedLessonFieldRefs {
    readonly id: FieldRef<"CompletedLesson", 'String'>
    readonly userId: FieldRef<"CompletedLesson", 'String'>
    readonly lessonId: FieldRef<"CompletedLesson", 'String'>
    readonly createdAt: FieldRef<"CompletedLesson", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CompletedLesson findUnique
   */
  export type CompletedLessonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedLesson
     */
    select?: CompletedLessonSelect<ExtArgs> | null
    /**
     * Filter, which CompletedLesson to fetch.
     */
    where: CompletedLessonWhereUniqueInput
  }

  /**
   * CompletedLesson findUniqueOrThrow
   */
  export type CompletedLessonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedLesson
     */
    select?: CompletedLessonSelect<ExtArgs> | null
    /**
     * Filter, which CompletedLesson to fetch.
     */
    where: CompletedLessonWhereUniqueInput
  }

  /**
   * CompletedLesson findFirst
   */
  export type CompletedLessonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedLesson
     */
    select?: CompletedLessonSelect<ExtArgs> | null
    /**
     * Filter, which CompletedLesson to fetch.
     */
    where?: CompletedLessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompletedLessons to fetch.
     */
    orderBy?: CompletedLessonOrderByWithRelationInput | CompletedLessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompletedLessons.
     */
    cursor?: CompletedLessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompletedLessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompletedLessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompletedLessons.
     */
    distinct?: CompletedLessonScalarFieldEnum | CompletedLessonScalarFieldEnum[]
  }

  /**
   * CompletedLesson findFirstOrThrow
   */
  export type CompletedLessonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedLesson
     */
    select?: CompletedLessonSelect<ExtArgs> | null
    /**
     * Filter, which CompletedLesson to fetch.
     */
    where?: CompletedLessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompletedLessons to fetch.
     */
    orderBy?: CompletedLessonOrderByWithRelationInput | CompletedLessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompletedLessons.
     */
    cursor?: CompletedLessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompletedLessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompletedLessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompletedLessons.
     */
    distinct?: CompletedLessonScalarFieldEnum | CompletedLessonScalarFieldEnum[]
  }

  /**
   * CompletedLesson findMany
   */
  export type CompletedLessonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedLesson
     */
    select?: CompletedLessonSelect<ExtArgs> | null
    /**
     * Filter, which CompletedLessons to fetch.
     */
    where?: CompletedLessonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompletedLessons to fetch.
     */
    orderBy?: CompletedLessonOrderByWithRelationInput | CompletedLessonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompletedLessons.
     */
    cursor?: CompletedLessonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompletedLessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompletedLessons.
     */
    skip?: number
    distinct?: CompletedLessonScalarFieldEnum | CompletedLessonScalarFieldEnum[]
  }

  /**
   * CompletedLesson create
   */
  export type CompletedLessonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedLesson
     */
    select?: CompletedLessonSelect<ExtArgs> | null
    /**
     * The data needed to create a CompletedLesson.
     */
    data: XOR<CompletedLessonCreateInput, CompletedLessonUncheckedCreateInput>
  }

  /**
   * CompletedLesson createMany
   */
  export type CompletedLessonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompletedLessons.
     */
    data: CompletedLessonCreateManyInput | CompletedLessonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompletedLesson createManyAndReturn
   */
  export type CompletedLessonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedLesson
     */
    select?: CompletedLessonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CompletedLessons.
     */
    data: CompletedLessonCreateManyInput | CompletedLessonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompletedLesson update
   */
  export type CompletedLessonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedLesson
     */
    select?: CompletedLessonSelect<ExtArgs> | null
    /**
     * The data needed to update a CompletedLesson.
     */
    data: XOR<CompletedLessonUpdateInput, CompletedLessonUncheckedUpdateInput>
    /**
     * Choose, which CompletedLesson to update.
     */
    where: CompletedLessonWhereUniqueInput
  }

  /**
   * CompletedLesson updateMany
   */
  export type CompletedLessonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompletedLessons.
     */
    data: XOR<CompletedLessonUpdateManyMutationInput, CompletedLessonUncheckedUpdateManyInput>
    /**
     * Filter which CompletedLessons to update
     */
    where?: CompletedLessonWhereInput
  }

  /**
   * CompletedLesson upsert
   */
  export type CompletedLessonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedLesson
     */
    select?: CompletedLessonSelect<ExtArgs> | null
    /**
     * The filter to search for the CompletedLesson to update in case it exists.
     */
    where: CompletedLessonWhereUniqueInput
    /**
     * In case the CompletedLesson found by the `where` argument doesn't exist, create a new CompletedLesson with this data.
     */
    create: XOR<CompletedLessonCreateInput, CompletedLessonUncheckedCreateInput>
    /**
     * In case the CompletedLesson was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompletedLessonUpdateInput, CompletedLessonUncheckedUpdateInput>
  }

  /**
   * CompletedLesson delete
   */
  export type CompletedLessonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedLesson
     */
    select?: CompletedLessonSelect<ExtArgs> | null
    /**
     * Filter which CompletedLesson to delete.
     */
    where: CompletedLessonWhereUniqueInput
  }

  /**
   * CompletedLesson deleteMany
   */
  export type CompletedLessonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompletedLessons to delete
     */
    where?: CompletedLessonWhereInput
  }

  /**
   * CompletedLesson without action
   */
  export type CompletedLessonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedLesson
     */
    select?: CompletedLessonSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserXpScalarFieldEnum: {
    userId: 'userId',
    xp: 'xp',
    level: 'level'
  };

  export type UserXpScalarFieldEnum = (typeof UserXpScalarFieldEnum)[keyof typeof UserXpScalarFieldEnum]


  export const ProcessedEventScalarFieldEnum: {
    eventId: 'eventId',
    type: 'type',
    processedAt: 'processedAt'
  };

  export type ProcessedEventScalarFieldEnum = (typeof ProcessedEventScalarFieldEnum)[keyof typeof ProcessedEventScalarFieldEnum]


  export const CompletedLessonScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    lessonId: 'lessonId',
    createdAt: 'createdAt'
  };

  export type CompletedLessonScalarFieldEnum = (typeof CompletedLessonScalarFieldEnum)[keyof typeof CompletedLessonScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserXpWhereInput = {
    AND?: UserXpWhereInput | UserXpWhereInput[]
    OR?: UserXpWhereInput[]
    NOT?: UserXpWhereInput | UserXpWhereInput[]
    userId?: StringFilter<"UserXp"> | string
    xp?: IntFilter<"UserXp"> | number
    level?: IntFilter<"UserXp"> | number
  }

  export type UserXpOrderByWithRelationInput = {
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
  }

  export type UserXpWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: UserXpWhereInput | UserXpWhereInput[]
    OR?: UserXpWhereInput[]
    NOT?: UserXpWhereInput | UserXpWhereInput[]
    xp?: IntFilter<"UserXp"> | number
    level?: IntFilter<"UserXp"> | number
  }, "userId">

  export type UserXpOrderByWithAggregationInput = {
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    _count?: UserXpCountOrderByAggregateInput
    _avg?: UserXpAvgOrderByAggregateInput
    _max?: UserXpMaxOrderByAggregateInput
    _min?: UserXpMinOrderByAggregateInput
    _sum?: UserXpSumOrderByAggregateInput
  }

  export type UserXpScalarWhereWithAggregatesInput = {
    AND?: UserXpScalarWhereWithAggregatesInput | UserXpScalarWhereWithAggregatesInput[]
    OR?: UserXpScalarWhereWithAggregatesInput[]
    NOT?: UserXpScalarWhereWithAggregatesInput | UserXpScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserXp"> | string
    xp?: IntWithAggregatesFilter<"UserXp"> | number
    level?: IntWithAggregatesFilter<"UserXp"> | number
  }

  export type ProcessedEventWhereInput = {
    AND?: ProcessedEventWhereInput | ProcessedEventWhereInput[]
    OR?: ProcessedEventWhereInput[]
    NOT?: ProcessedEventWhereInput | ProcessedEventWhereInput[]
    eventId?: StringFilter<"ProcessedEvent"> | string
    type?: StringFilter<"ProcessedEvent"> | string
    processedAt?: DateTimeFilter<"ProcessedEvent"> | Date | string
  }

  export type ProcessedEventOrderByWithRelationInput = {
    eventId?: SortOrder
    type?: SortOrder
    processedAt?: SortOrder
  }

  export type ProcessedEventWhereUniqueInput = Prisma.AtLeast<{
    eventId?: string
    AND?: ProcessedEventWhereInput | ProcessedEventWhereInput[]
    OR?: ProcessedEventWhereInput[]
    NOT?: ProcessedEventWhereInput | ProcessedEventWhereInput[]
    type?: StringFilter<"ProcessedEvent"> | string
    processedAt?: DateTimeFilter<"ProcessedEvent"> | Date | string
  }, "eventId">

  export type ProcessedEventOrderByWithAggregationInput = {
    eventId?: SortOrder
    type?: SortOrder
    processedAt?: SortOrder
    _count?: ProcessedEventCountOrderByAggregateInput
    _max?: ProcessedEventMaxOrderByAggregateInput
    _min?: ProcessedEventMinOrderByAggregateInput
  }

  export type ProcessedEventScalarWhereWithAggregatesInput = {
    AND?: ProcessedEventScalarWhereWithAggregatesInput | ProcessedEventScalarWhereWithAggregatesInput[]
    OR?: ProcessedEventScalarWhereWithAggregatesInput[]
    NOT?: ProcessedEventScalarWhereWithAggregatesInput | ProcessedEventScalarWhereWithAggregatesInput[]
    eventId?: StringWithAggregatesFilter<"ProcessedEvent"> | string
    type?: StringWithAggregatesFilter<"ProcessedEvent"> | string
    processedAt?: DateTimeWithAggregatesFilter<"ProcessedEvent"> | Date | string
  }

  export type CompletedLessonWhereInput = {
    AND?: CompletedLessonWhereInput | CompletedLessonWhereInput[]
    OR?: CompletedLessonWhereInput[]
    NOT?: CompletedLessonWhereInput | CompletedLessonWhereInput[]
    id?: StringFilter<"CompletedLesson"> | string
    userId?: StringFilter<"CompletedLesson"> | string
    lessonId?: StringFilter<"CompletedLesson"> | string
    createdAt?: DateTimeFilter<"CompletedLesson"> | Date | string
  }

  export type CompletedLessonOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonId?: SortOrder
    createdAt?: SortOrder
  }

  export type CompletedLessonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_lessonId?: CompletedLessonUserIdLessonIdCompoundUniqueInput
    AND?: CompletedLessonWhereInput | CompletedLessonWhereInput[]
    OR?: CompletedLessonWhereInput[]
    NOT?: CompletedLessonWhereInput | CompletedLessonWhereInput[]
    userId?: StringFilter<"CompletedLesson"> | string
    lessonId?: StringFilter<"CompletedLesson"> | string
    createdAt?: DateTimeFilter<"CompletedLesson"> | Date | string
  }, "id" | "userId_lessonId">

  export type CompletedLessonOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonId?: SortOrder
    createdAt?: SortOrder
    _count?: CompletedLessonCountOrderByAggregateInput
    _max?: CompletedLessonMaxOrderByAggregateInput
    _min?: CompletedLessonMinOrderByAggregateInput
  }

  export type CompletedLessonScalarWhereWithAggregatesInput = {
    AND?: CompletedLessonScalarWhereWithAggregatesInput | CompletedLessonScalarWhereWithAggregatesInput[]
    OR?: CompletedLessonScalarWhereWithAggregatesInput[]
    NOT?: CompletedLessonScalarWhereWithAggregatesInput | CompletedLessonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CompletedLesson"> | string
    userId?: StringWithAggregatesFilter<"CompletedLesson"> | string
    lessonId?: StringWithAggregatesFilter<"CompletedLesson"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CompletedLesson"> | Date | string
  }

  export type UserXpCreateInput = {
    userId: string
    xp?: number
    level?: number
  }

  export type UserXpUncheckedCreateInput = {
    userId: string
    xp?: number
    level?: number
  }

  export type UserXpUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
  }

  export type UserXpUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
  }

  export type UserXpCreateManyInput = {
    userId: string
    xp?: number
    level?: number
  }

  export type UserXpUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
  }

  export type UserXpUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
  }

  export type ProcessedEventCreateInput = {
    eventId: string
    type: string
    processedAt?: Date | string
  }

  export type ProcessedEventUncheckedCreateInput = {
    eventId: string
    type: string
    processedAt?: Date | string
  }

  export type ProcessedEventUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEventUncheckedUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEventCreateManyInput = {
    eventId: string
    type: string
    processedAt?: Date | string
  }

  export type ProcessedEventUpdateManyMutationInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEventUncheckedUpdateManyInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletedLessonCreateInput = {
    id?: string
    userId: string
    lessonId: string
    createdAt?: Date | string
  }

  export type CompletedLessonUncheckedCreateInput = {
    id?: string
    userId: string
    lessonId: string
    createdAt?: Date | string
  }

  export type CompletedLessonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lessonId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletedLessonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lessonId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletedLessonCreateManyInput = {
    id?: string
    userId: string
    lessonId: string
    createdAt?: Date | string
  }

  export type CompletedLessonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lessonId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletedLessonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lessonId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserXpCountOrderByAggregateInput = {
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
  }

  export type UserXpAvgOrderByAggregateInput = {
    xp?: SortOrder
    level?: SortOrder
  }

  export type UserXpMaxOrderByAggregateInput = {
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
  }

  export type UserXpMinOrderByAggregateInput = {
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
  }

  export type UserXpSumOrderByAggregateInput = {
    xp?: SortOrder
    level?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProcessedEventCountOrderByAggregateInput = {
    eventId?: SortOrder
    type?: SortOrder
    processedAt?: SortOrder
  }

  export type ProcessedEventMaxOrderByAggregateInput = {
    eventId?: SortOrder
    type?: SortOrder
    processedAt?: SortOrder
  }

  export type ProcessedEventMinOrderByAggregateInput = {
    eventId?: SortOrder
    type?: SortOrder
    processedAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CompletedLessonUserIdLessonIdCompoundUniqueInput = {
    userId: string
    lessonId: string
  }

  export type CompletedLessonCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonId?: SortOrder
    createdAt?: SortOrder
  }

  export type CompletedLessonMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonId?: SortOrder
    createdAt?: SortOrder
  }

  export type CompletedLessonMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lessonId?: SortOrder
    createdAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserXpDefaultArgs instead
     */
    export type UserXpArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserXpDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProcessedEventDefaultArgs instead
     */
    export type ProcessedEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProcessedEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompletedLessonDefaultArgs instead
     */
    export type CompletedLessonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompletedLessonDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}