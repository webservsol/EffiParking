import {routerTransition} from "../../router.animations";
import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OnDestroy} from "@angular/core";
import {ParkingService} from "../../shared/services/parking.service";
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {DisplayMessage} from "../../shared/models/display-message";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {AppConstants} from "../../shared/constants";

@Component({
  selector: 'app-parking-page',
  templateUrl: './parking-page.component.html',
  styleUrls: ['./parking-page.component.scss'],
  animations: [routerTransition()]
})
export class ParkingPageComponent implements OnInit, OnDestroy {
  private sub: any;
  private id: number;
  private parking: any;
  private currentUser: any;
  private isOwner: boolean = false;
  private isAdmin: boolean = false;
  private currentLat: number;
  private currentLng: number;
  private startDate: any;
  private startTime: any;
  private endDate: any;
  private endTime: any;
  private showReservationForm: boolean = false;
  private reservedLotId: number;
  private notification: DisplayMessage;
  private title: string;
  private text: string;
  private minDate: NgbDateStruct;
  private editTrigger: boolean = false;
  private editParkingAreaForm: FormGroup;
  private addLotsForm: FormGroup;
  private removeLotsForm: FormGroup;
  private searchEmployeeForm: FormGroup;
  private submitted = false;
  private closeButton = false;
  private okButton = false;
  private addLotsTrigger = false;
  private removeLotsTrigger = false;
  private addEmployeeTrigger = false;
  private searchEmployeesResult = [];
  private searchTrigger = false;
  private returnTrigger = false;
  private resSuccessTrigger = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private parkingService: ParkingService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private ngbDateFormatter: NgbDateParserFormatter,
              private modalService: NgbModal) {
    let date = new Date();
    this.minDate = {year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate()};
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
    });
    this.currentUser = JSON.parse(localStorage.getItem(AppConstants.CURRENT_USER));
    //noinspection TypeScriptUnresolvedFunction
    this.parkingService.getById(this.id).subscribe(parking => {
      this.parking = parking;
      if (this.currentUser.id == this.parking.owner.id) {
        this.isOwner = true;
      }
      if(this.currentUser.authorities[0].authority == AppConstants.ADMIN_ROLE) {
        this.isAdmin = true;
      }
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLat = position.coords.latitude;
        this.currentLng = position.coords.longitude;
      });
    }

    this.editParkingAreaForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(64)])],
      locationName: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(64)])],
      city: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(64)])],
      street: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(64)])],
      number: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(64)])],
      latitude: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(500)])],
      longitude: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(500)])]
    });

    this.addLotsForm = this.formBuilder.group({
      numberOfAddedLots: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(64)])]
    });

    this.removeLotsForm = this.formBuilder.group({
      numberOfRemovedLots: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(64)])]
    });

    this.searchEmployeeForm = this.formBuilder.group({
      term: ['', Validators.compose([Validators.required])]
    });
  }

  showForm() {
    if(localStorage.getItem(AppConstants.LOGGED_IN)) {
      this.showReservationForm = !this.showReservationForm;
    } else {
      this.title = AppConstants.NOT_PERMITTED_TITLE;
      this.text = AppConstants.NOT_PERMITTED_TEXT;
      this.okButton = true;
      this.closeButton = false;
      this.returnTrigger = true;
      document.getElementById(AppConstants.MODAL_CONTENT).click();
    }
  }

  submitReservation() {
    this.notification = undefined;
    let sd = this.ngbDateFormatter.format(this.startDate);
    let ed = this.ngbDateFormatter.format(this.endDate);
    let sth, stm, eth, etm;

    let currentTime = new Date();
    if (this.startDate.year == this.minDate.year && this.startDate.month == this.minDate.month && this.startDate.day == this.minDate.day) {
      if (currentTime.getHours() > this.startTime.hour) {
        this.title = AppConstants.INVALID_TIME_TITLE;
        this.text = AppConstants.INVALID_PAST_TIME_TEXT;
        this.returnTrigger = true;
        this.closeButton = false;
        this.okButton = true;
        document.getElementById(AppConstants.MODAL_CONTENT).click();
        return;
      } else if (currentTime.getHours() == this.startTime.hour) {
        if (currentTime.getMinutes() > this.startTime.minute) {
          this.title = AppConstants.INVALID_TIME_TITLE;
          this.text = AppConstants.INVALID_PAST_TIME_TEXT;
          this.returnTrigger = true;
          document.getElementById(AppConstants.MODAL_CONTENT).click();
          return;
        }
      }
    }

    if (this.startTime.hour > this.endTime.hour) {
      this.title = AppConstants.INVALID_TIME_TITLE;
      this.text = AppConstants.INVALID_LEAVE_TIME_TEXT;
      this.returnTrigger = true;
      document.getElementById(AppConstants.MODAL_CONTENT).click();
      return;
    } else if (this.startTime.hour == this.endTime.hour) {
      if (this.startTime.minute > this.endTime.minute) {
        this.title = AppConstants.INVALID_TIME_TITLE;
        this.text = AppConstants.INVALID_LEAVE_TIME_TEXT;
        this.returnTrigger = true;
        document.getElementById(AppConstants.MODAL_CONTENT).click();
        return;
      }
    }

    if (this.startTime.hour.toString().length == 1) {
      sth = "0" + this.startTime.hour.toString();
    } else {
      sth = this.startTime.hour.toString();
    }

    if (this.startTime.minute.toString().length == 1) {
      stm = "0" + this.startTime.minute.toString();
    } else {
      stm = this.startTime.minute.toString();
    }

    if (this.endTime.hour.toString().length == 1) {
      eth = "0" + this.endTime.hour.toString();
    } else {
      eth = this.endTime.hour.toString();
    }

    if (this.endTime.minute.toString().length == 1) {
      etm = "0" + this.endTime.minute.toString();
    } else {
      etm = this.endTime.minute.toString();
    }

    let resStartTime = sd + "T" + sth + ":" + stm;
    let resEndTime = ed + "T" + eth + ":" + etm;

    let reservation = {
      "startDate": resStartTime,
      "endDate": resEndTime
    };

    //noinspection TypeScriptUnresolvedFunction
    this.parkingService.makeReservation(reservation, this.id, this.currentUser.username)
      .subscribe(res => {
          if (res) {
            this.reservedLotId = res;
            this.title = AppConstants.SUCCESS_TITLE;
            this.text = AppConstants.RESERVATION_TEXT + this.reservedLotId + " !";
            this.returnTrigger = false;
            this.okButton = true;
            this.closeButton = false;
            this.resSuccessTrigger = true;
            document.getElementById(AppConstants.MODAL_CONTENT).click();
          }
        },
        error => {
          this.title = AppConstants.ERROR_TITLE;
          this.text = AppConstants.ERROR_TEXT;
          this.returnTrigger = true;
          this.okButton = true;
          document.getElementById(AppConstants.MODAL_CONTENT).click();
        })
  }

  onEdit() {
    this.editTrigger = !this.editTrigger;
    this.removeLotsTrigger = false;
    this.addLotsTrigger = false;
  }

  onAddLots() {
    this.removeLotsTrigger = false;
    this.editTrigger = false;
    this.addLotsTrigger = !this.addLotsTrigger;
  }

  onRemoveLots() {
    this.addLotsTrigger = false;
    this.editTrigger = false;
    this.removeLotsTrigger = !this.removeLotsTrigger;
  }

  onAddEmployee() {
    this.addLotsTrigger = false;
    this.editTrigger = false;
    this.removeLotsTrigger = false;
    this.addEmployeeTrigger = !this.addEmployeeTrigger;
  }

  onSubmitEditForm() {
    this.notification = undefined;
    if(this.editParkingAreaForm.pristine) {
      this.notification = {msgType: 'error', msgBody: AppConstants.PRISTINE_FORM};
      return;
    }
    if(this.editParkingAreaForm.get('name').invalid) {
      this.notification = {msgType: 'error', msgBody: AppConstants.INVALID_PARKING_NAME};
      return;
    }
    if(this.editParkingAreaForm.get('locationName').invalid) {
      this.notification = {msgType: 'error', msgBody: AppConstants.INVALID_PARKING_LOCATION};
      return;
    }
    if(this.editParkingAreaForm.get('city').invalid) {
      this.notification = {msgType: 'error', msgBody: AppConstants.INVALID_PARKING_CITY};
      return;
    }
    if(this.editParkingAreaForm.get('street').invalid) {
      this.notification = {msgType: 'error', msgBody: AppConstants.INVALID_PARKING_STREET};
      return;
    }
    if(this.editParkingAreaForm.get('number').invalid) {
      this.notification = {msgType: 'error', msgBody: AppConstants.INVALID_PARKING_NUMBER};
      return;
    }
    if(this.editParkingAreaForm.get('latitude').invalid) {
      this.notification = {msgType: 'error', msgBody: AppConstants.INVALID_LATITUDE};
      return;
    }
    if(this.editParkingAreaForm.get('longitude').invalid) {
      this.notification = {msgType: 'error', msgBody: AppConstants.INVALID_LONGITUDE};
      return;
    }
    this.submitted = true;
    //noinspection TypeScriptUnresolvedFunction
    this.parkingService.editParkingArea(this.id, this.editParkingAreaForm.value)
      .delay(1000)
      .subscribe(res => {
          console.log(res);
          if (res) {
            this.editParkingAreaForm.reset();
            this.title = AppConstants.SUCCESS_TITLE;
            this.text = AppConstants.EDIT_PARKING_TEXT;
            this.closeButton = true;
            this.returnTrigger = false;
            document.getElementById(AppConstants.MODAL_CONTENT).click();
          }
        },
        error => {
          this.submitted = false;
          this.title = AppConstants.ERROR_TITLE;
          this.text = AppConstants.ERROR_TEXT;
          this.okButton = true;
          this.returnTrigger = true;
          document.getElementById(AppConstants.MODAL_CONTENT).click();
        });
  }

  onSearchEmployeeSubmit() {
    this.submitted = true;
    //noinspection TypeScriptUnresolvedFunction
    this.userService.getEmployeeByTerm(this.currentUser.id, this.searchEmployeeForm.value.term)
      .subscribe(res => {
        if(res) {
          this.searchEmployeeForm.reset();
          this.searchEmployeesResult = res;
          this.searchTrigger = true;
        }
      },
      error => {
        this.submitted = false;
        this.title = AppConstants.ERROR_TITLE;
        this.text = AppConstants.ERROR_TEXT;
        this.returnTrigger = true;
        this.okButton = true;
        document.getElementById(AppConstants.MODAL_CONTENT).click();
      });
  }

  onSubmitAddLots() {
    this.submitted = true;
    //noinspection TypeScriptUnresolvedFunction
    this.parkingService.addLots(this.id, this.addLotsForm.value.numberOfAddedLots)
      .subscribe(res => {
        if (res) {
          this.title = AppConstants.SUCCESS_TITLE;
          this.text = AppConstants.ADD_LOTS_TEXT + this.addLotsForm.value.numberOfAddedLots + " lots!";
          this.okButton = false;
          this.closeButton = true;
          this.returnTrigger = false;
          document.getElementById(AppConstants.MODAL_CONTENT).click();
        }
      }, error => {
        this.submitted = false;
        this.title = AppConstants.ERROR_TITLE;
        this.text = AppConstants.ERROR_TEXT;
        this.returnTrigger = true;
        this.okButton = true;
        document.getElementById(AppConstants.MODAL_CONTENT).click();
      });
  }

  onSubmitRemoveLots() {
    this.submitted = true;
    //noinspection TypeScriptUnresolvedFunction
    this.parkingService.removeLots(this.id, this.removeLotsForm.value.numberOfRemovedLots)
      .subscribe(res => {
          if (res) {
            this.title = AppConstants.SUCCESS_TITLE;
            this.text = AppConstants.REMOVE_LOTS_TEXT + this.removeLotsForm.value.numberOfRemovedLots + " lots!";
            this.okButton = false;
            this.closeButton = true;
            this.returnTrigger = false;
            document.getElementById(AppConstants.MODAL_CONTENT).click();
          }
        }, error => {
          this.submitted = false;
          this.title = AppConstants.ERROR_TITLE;
          this.text = AppConstants.ERROR_TEXT;
          this.returnTrigger = true;
          this.okButton = true;
          document.getElementById(AppConstants.MODAL_CONTENT).click();
        });
  }

  onDeleteParking() {
    this.title = AppConstants.CONFIRM_TITLE;
    this.text = AppConstants.DELETE_PARKING_CONFIRM_TEXT;
    document.getElementById(AppConstants.MODAL_CONTENT_DEL).click();
  }

  onApproveDeleteParking() {
    //noinspection TypeScriptUnresolvedFunction
    this.parkingService.deleteParkingArea(this.id).subscribe(res => {
      if (res) {
        this.title = AppConstants.SUCCESS_TITLE;
        this.text = AppConstants.DELETE_PARKING_TEXT;
        this.closeButton = false;
        this.okButton = true;
        this.returnTrigger = false;
        document.getElementById(AppConstants.MODAL_CONTENT).click();
      }
    }, error => {
      this.title = AppConstants.ERROR_TITLE;
      this.text = AppConstants.ERROR_TEXT;
      this.closeButton = false;
      this.okButton = true;
      this.returnTrigger = true;
      document.getElementById(AppConstants.MODAL_CONTENT).click();
    });
  }

  assignEmployee(employeeId) {
    //noinspection TypeScriptUnresolvedFunction
    this.parkingService.addEmployee(this.id, employeeId).subscribe(res => {
      if(res) {
        this.title = AppConstants.SUCCESS_TITLE;
        this.text = AppConstants.ASSIGN_EMPLOYEE_TEXT;
        this.closeButton = true;
        this.okButton = false;
        this.returnTrigger = false;
        document.getElementById(AppConstants.MODAL_CONTENT).click();
      }
    }, error => {
      this.title = AppConstants.ERROR_TITLE;
      this.text = AppConstants.ERROR_TEXT;
      this.closeButton = false;
      this.okButton = true;
      this.returnTrigger = true;
      document.getElementById(AppConstants.MODAL_CONTENT).click();
    });
  }

  removeEmployee(employeeId) {
    //noinspection TypeScriptUnresolvedFunction
    this.parkingService.removeEmployee(this.id, employeeId).subscribe(res => {
      if(res) {
        this.title = AppConstants.SUCCESS_TITLE;
        this.text = AppConstants.REMOVE_EMPLOYEE_TEXT;
        this.closeButton = true;
        this.okButton = false;
        this.returnTrigger = false;
        document.getElementById(AppConstants.MODAL_CONTENT).click();
      }
    }, error => {
      this.title = AppConstants.ERROR_TITLE;
      this.text = AppConstants.ERROR_TEXT;
      this.closeButton = false;
      this.okButton = true;
      this.returnTrigger = true;
      document.getElementById(AppConstants.MODAL_CONTENT).click();
    });
  }

  open(content) {
    //noinspection TypeScriptUnresolvedFunction
    this.modalService.open(content).result.then((result) => {
      if (result == AppConstants.CLOSE) {
        window.location.reload();
      } else if (result == AppConstants.OK) {
        if(this.returnTrigger == true) {
          return;
        } else if(this.resSuccessTrigger == true) {
          this.router.navigate(['/reservations-page']);
        } else {
          this.router.navigate(['/owner-page']);
        }
      }
      return;
    }, (reason) => {
      return;
    });
  }

  open2(contentDel) {
    //noinspection TypeScriptUnresolvedFunction
    this.modalService.open(contentDel).result.then((result) => {
      if (result == AppConstants.YES) {
        this.onApproveDeleteParking();
      } else {
        return;
      }
    }, (reason) => {
      return;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
