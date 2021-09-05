import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {RoomDetailsComponent} from 'src/app/room-details/room-details.component';
import {RoomService} from 'src/app/room.service';
import{Room} from "src/app/room";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms:Room[];

  constructor(
    private roomService: RoomService, 
    private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(){
    //this.rooms = this.roomService.getRoomList();

    this.roomService.getRoomList().subscribe(
      data => {
        console.log(data);
        this.rooms = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  updateRoom(id:number){
    this.router.navigate(['update',id]);
  }
  deleteRoom(id:number){
    this.roomService.deleteRoom(id).subscribe(
      data => {
       console.log(data)
       this.reloadData() 
      },
      error => console.log(error)
    );

  }
  roomDetails(id:number){
    this.router.navigate(['details',id]);
  }
}
