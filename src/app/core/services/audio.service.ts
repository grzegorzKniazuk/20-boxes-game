import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {

  private audio: HTMLAudioElement = new Audio();
  private readonly clickSRC = '../../../../assets/audio/click.wav';

  constructor() {
  }

  public playAudio(): void {
    this.audio.src = this.clickSRC;
    this.audio.load();
    this.audio.play();
  }
}
