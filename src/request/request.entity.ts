import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ticket_name: string;

    @Column()
    quantity: number;

    @Column({nullable: true})
    request_status: string;

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Updated User with id', this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log('Removed User with id', this.id);
    }
}