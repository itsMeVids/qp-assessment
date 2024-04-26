import {TypeOrmModuleOptions} from '@nestjs/typeorm';
export const config: TypeOrmModuleOptions ={
    host:'localhost',
    type:'postgres',
    port:5432,
    database:'grocery-booking',
    password:'252502',
    username:'postgres',
    synchronize:false,
    entities :['dist/**/*.entity{.ts,.js}']
}