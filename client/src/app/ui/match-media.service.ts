import { Injectable } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { BehaviorSubject } from 'rxjs';

export interface WindowHeight {
  upperBound: number;
  lowerBound: number;
  alias: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchMediaService {
  activeMediaQuery: string;
  onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  windowHeight = new BehaviorSubject<number>(window.innerHeight);

  private windowHeightTypes: WindowHeight[];

  constructor(
    private mediaObserver: MediaObserver
  ) {
    this.activeMediaQuery = '';
    this.windowHeightTypes = this.setWindowHeightDefinitions();
    this.init();
  }


  private init(): void {
    this.mediaObserver.media$
      .subscribe((change: MediaChange) => {
        if (this.activeMediaQuery !== change.mqAlias) {
          this.activeMediaQuery = change.mqAlias;
          this.onMediaChange.next(change.mqAlias);
        }
      });
  }


  setWindowHeightValue(value: number) {
    this.windowHeight.next(value);
  }

  getWindowHeightType(windowSize: number): WindowHeight {
    return this.windowHeightTypes.find(wSize => {
      return wSize.upperBound >= windowSize && wSize.lowerBound < windowSize;
    });
  }

  private setWindowHeightDefinitions(): WindowHeight[] {
    return [
      {
        upperBound: 4000,
        lowerBound: 981,
        alias: 'xl'
      },
      {
        upperBound: 980,
        lowerBound: 900,
        alias: 'lg'
      },
      {
        upperBound: 900,
        lowerBound: 800,
        alias: 'md'
      },
      {
        upperBound: 800,
        lowerBound: 650,
        alias: 'sm'
      },
      {
        upperBound: 650,
        lowerBound: 0,
        alias: 'xs'
      }
    ];
  }
}
