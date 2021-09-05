import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {

  id: number;
  room: Room;
  submitted = false;

  constructor(
    private roomService: RoomService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.room = new Room();
    this.id = this.activatedRouter.snapshot.params['id'];
    this.roomService.getRoom(this.id).subscribe(
      data => {
        console.log(data);
        this.room = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  updateRoom(){
    this.roomService.updateRoom(this.id, this.room).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
    this.room = new Room();
    this.goToList();
  }

  goToList(){
    this.router.navigate(['/rooms']);
  }

  onSubmit() {
    this.updateRoom();
  }

}
