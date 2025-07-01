import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DiscoverService } from '../../services/discover.service';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss',
})
export class DiscoverComponent implements OnInit, AfterViewInit {

  @ViewChild('tabGroup') public tabGroup!: MatTabGroup;
  private _discoverService = inject(DiscoverService);
  private _modalService = inject(NgbModal);
  private _fb = inject(FormBuilder);
  private _route = inject(ActivatedRoute);
  private _cdr = inject(ChangeDetectorRef);
  public userProfiles: any[] = [];
  public userProfileswithProfileMatching: any[] = [];
  public userProfilesBySearchingFor: any[] = [];
  public page = 1;
  public totalItems = 0;
  public itemsPerPage = 10;
  public collection: any[] = [];
  public filterForm!: FormGroup;
  public minAgeOptions: number[] = Array.from({ length: 21 }, (_, i) => 18 + i);
  public maxAgeOptions: number[] = Array.from({ length: 21 }, (_, i) => 18 + i);
  public minHeightOptions: number[] = [];
  public maxHeightOptions: number[] = [];
  public religionOptions = ['Hindu', 'Christian', 'Islam', 'Buddhist', 'Jewish', 'Other'];
  public educationOptions: string[] = [];
  public isLoading: boolean = false;
  public filterParams = {
    minAge: 0,
    maxAge: 0,
    minHeight: 0,
    maxHeight: 0,
    childrens: '',
    wishForChildren: '',
    smoking: '',
    religion: '',
    education: ''
  };

  newForYou = [
    {
      id: "new1",
      image: "about-us.jpg",
      name: "Moona",
      designation: "Makeup Artist",
      location: "Mumbai",
      age: 30
    },
    {
      id: "new2",
      image: "about-us.jpg",
      name: "Moona",
      designation: "Makeup Artist",
      location: "Mumbai",
      age: 30
    },
    {
      id: "new3",
      image: "about-us.jpg",
      name: "Moona",
      location: "Mumbai",
      age: 30
    },
    {
      id: "new4",
      image: "about-us.jpg",
      name: "Moona",
      designation: "Makeup Artist",
      location: "Mumbai",
      age: 30
    },
    {
      id: "new5",
      image: "about-us.jpg",
      name: "Moona",
      location: "Mumbai",
      age: 30
    },
    {
      id: "new5",
      image: "about-us.jpg",
      name: "Moona",
      designation: "Makeup Artist",
      location: "Mumbai",
      age: 30
    },
  ]

  music = [
    "Alternative", "Blues", "Chember music", "Chillout", "Classical music", "Country", "Dance", "Easy listening", "Electro", "Folk music"
  ]

  sports = ["American Football", "Athletics", "Badminton", "Baseball", "Basketball", "Bouldering", "Bowling", "Canoe", "Climing"]

  trips = ["Active Trips", "Adventure Trips", "All-Inclusive Trips", "Art & Culture Holidays", "Backpacking", "Beach Trips"]

  constructor() {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }

    this.minHeightOptions = this.generateHeightOptions(5.0, 6.2);
    this.maxHeightOptions = [...this.minHeightOptions];
  }

  ngOnInit(): void {
    // this.getUserwithProfileMatch();
    setTimeout(() => this.getUserwithProfileMatch(), 0);
    this._initializeForm();
  }

  ngAfterViewInit(): void {
    this._route.queryParams.subscribe(params => {
      const tabIndex = +params['tab'];
      if (!isNaN(tabIndex)) {
        this.tabGroup.selectedIndex = tabIndex;
      }
    });
  }

  onChangeItems() {
    this.itemsPerPage;
    this.getUserwithProfileMatch();
  }

  onPageChange(page: number) {
    this.page = page;
    this.getUserwithProfileMatch();
  }

  get pagedItems(): any[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.collection.slice(startIndex, endIndex);
  }

  getUserwithProfileMatch() {
    try {
      this.isLoading = true;
      this._discoverService.getAllUsersWithProfileMatching(this.page, this.itemsPerPage, this.filterParams.minAge, this.filterParams.maxAge, this.filterParams.minHeight, this.filterParams.maxHeight, this.filterParams.childrens, this.filterParams.wishForChildren, this.filterParams.smoking, this.filterParams.religion, this.filterParams.education).subscribe((response: any) => {
        if (response.success) {
          this.userProfileswithProfileMatching = response?.data;
          this.totalItems = response?.pagination?.count;
          let educationOptions: string[] = response?.data.map((item: any) => item.education);
          this.educationOptions = [...new Set(educationOptions)];
          this.isLoading = false;
        }
      })
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }

  onOpenPreferenceModal(content: TemplateRef<any>) {
    this._modalService.open(content, { centered: true, size: 'md' });
  }

  private _initializeForm() {
    this.filterForm = this._fb.group({
      minAge: 0,
      maxAge: 0,
      minHeight: 0,
      maxHeight: 0,
      childrens: '',
      wishForChildren: '',
      smoking: '',
      religion: '',
      education: ''
    }, { validators: this.atLeastOneFieldRequiredValidator });
  }

  onApplyFilter(formData: any) {
    try {
      this.filterParams = {
        minAge: Number(formData.minAge) || 0,
        maxAge: Number(formData.maxAge) || 0,
        minHeight: Number(formData.minHeight) || 0,
        maxHeight: Number(formData.maxHeight) || 0,
        childrens: formData.childrens || '',
        wishForChildren: formData.wishForChildren || '',
        smoking: formData.smoking || '',
        religion: formData.religion || '',
        education: formData.education || ''
      };

      this.getUserwithProfileMatch();
      this._modalService.dismissAll();
      this.filterForm.reset();
    } catch (error) {
      console.error(error)
    }
  }

  onRefresh() {
    window.location.reload();
  }

  private generateHeightOptions(start: number, end: number): number[] {
    const options: number[] = [];
    for (let h = start; h <= end; h += 0.1) {
      options.push(parseFloat(h.toFixed(1)));
    }
    return options;
  }

  private atLeastOneFieldRequiredValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const hasValue = Object.values(formGroup.value).some(value =>
      value !== null && value !== '' && value !== undefined
    );
    return hasValue ? null : { atLeastOneRequired: true };
  }

}
