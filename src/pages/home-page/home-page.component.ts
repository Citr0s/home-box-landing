import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from "../../services/weather-service/weather.service";
import { Subscription, switchMap, tap } from "rxjs";
import { IWeatherData } from "../../services/weather-service/types/weather-data.type";
import { LinkService } from "../../services/link-service/link.service";
import { ILink } from "../../services/link-service/types/link.type";
import { LocationService } from "../../services/location-service/location.service";
import { DeployService } from '../../services/deploy-service/deploy.service';
import { IDeploy } from '../../services/deploy-service/types/deploy.type';

@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

    public mediaLinks: Array<ILink> = [];
    public systemLinks: Array<ILink> = [];
    public productivityLinks: Array<ILink> = [];
    public toolsLinks: Array<ILink> = [];
    public weather: IWeatherData | null = null;
    public currentTime: Date = new Date();
    public isCheckingWeather: boolean = false;
    public deploys: Array<IDeploy> = [];

    private _subscriptions: Subscription = new Subscription();

    private _locationService: LocationService;
    private readonly _weatherService: WeatherService;
    private readonly _linkService: LinkService;
    private readonly _deployService: DeployService;

    constructor(locationService: LocationService, weatherService: WeatherService, linkService: LinkService, deployService: DeployService) {
        this._locationService = locationService;
        this._weatherService = weatherService;
        this._linkService = linkService;
        this._deployService = deployService;
    }

    public ngOnInit(): void {
        this._subscriptions.add(
            this._locationService.getLocation()
                .subscribe((response) => {
                    this._weatherService.getWeatherFor(response.latitude, response.longitude)
                        .subscribe((response) => {
                            this.weather = response;
                        })
                })
        );

        this._subscriptions.add(
            this._deployService.getAll()
                .subscribe((response) => {
                    this.deploys = response;
                })
        );

        this._subscriptions.add(
            this._linkService.getAllLinks()
                .pipe(
                    switchMap(() => {
                        return this._linkService.getMediaLinks()
                            .pipe(
                                tap((links) => {
                                    this.mediaLinks = links;
                                })
                            )
                    }),
                    switchMap(() => {
                        return this._linkService.getSystemLinks()
                            .pipe(
                                tap((links) => {
                                    this.systemLinks = links;
                                })
                            )
                    }),
                    switchMap(() => {
                        return this._linkService.getProductivityLinks()
                            .pipe(
                                tap((links) => {
                                    this.productivityLinks = links;
                                })
                            )
                    }),
                    switchMap(() => {
                        return this._linkService.getToolsLinks()
                            .pipe(
                                tap((links) => {
                                    this.toolsLinks = links;
                                })
                            )
                    }),
                )
                .subscribe()
        );

        setInterval(() => {
            this.currentTime = new Date();
        }, 1000);
    }

    public getWeatherIcon(weatherDescription: string): string {

        if (weatherDescription.toUpperCase() === 'CLOUDS') {
            return 'fa fa-cloud';
        }

        if (weatherDescription.toUpperCase() === 'RAIN') {
            return 'fa fa-tint';
        }

        if (weatherDescription.toUpperCase() === 'CLEAR') {
            return 'fa fa-sun-o';
        }

        if (this.currentTime.getHours() < 6 && this.currentTime.getHours() > 18) {
            return 'fa fa-moon-o';
        }

        return 'fa fa-sun-o';
    }

    public getGreeting(): string {

        let greeting = 'Welcome';

        if (this.currentTime.getHours() < 12) {
            greeting = 'Good Morning';
        }
        if (this.currentTime.getHours() > 12) {
            greeting = 'Good Afternoon';
        }
        if (this.currentTime.getHours() > 18) {
            greeting = 'Good Evening';
        }

        return greeting;
    }

    public roundWeatherTemperature(temperature: number): string {
        return `${Math.round(temperature * 100) / 100}℃`;
    }

    public titleCase(input: string): string {
        var splitStr = input.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    public refreshWeather(): void {
        this.isCheckingWeather = true;

        this._locationService.getCurrentLocation()
            .subscribe((location) => {
                this._weatherService.getLiveWeather(location.latitude, location.longitude)
                    .subscribe((response) => {
                        this.weather = response;
                        this.isCheckingWeather = false;
                    });
            })
    }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}
