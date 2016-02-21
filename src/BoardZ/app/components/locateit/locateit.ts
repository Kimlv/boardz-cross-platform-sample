import {Component, Input, OnInit} from 'angular2/core';
import {GeolocationService} from '../../services/geolocation/geolocation.service';
import {JsonPipe} from 'angular2/common';
import {GeoLocation} from '../../models/geolocation';

@Component({
    selector: 'locate-it',
    pipes: [JsonPipe],
    templateUrl: 'app/components/locateit/locateit.html'
})
export class LocateItComponent implements OnInit{

    private _hasError: boolean = false;
    private _isLocating: boolean = false;

    @Input('coords')
    _coords: GeoLocation;

    constructor(private _geolocationService: GeolocationService) {

    }

    ngOnInit(): any {
        this._isLocating = true;
        this._geolocationService.locate()
            .then((coords)=> {
                this._hasError = false;
                this._isLocating = false;
                this._coords = coords;
            })
            .catch(()=> {
                this._hasError = true;
                this._isLocating = false;

            });
    }

}