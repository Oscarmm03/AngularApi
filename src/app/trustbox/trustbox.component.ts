import { Component, OnInit } from '@angular/core';

// Add type declaration for Trustpilot property on Window interface
declare global {
  interface Window {
    Trustpilot: any;
  }
}

@Component({
  selector: 'app-trustbox',
  templateUrl: './trustbox.component.html'
})
export class TrustboxComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    const trustboxRef = document.getElementById('trustbox');
    window.Trustpilot.loadFromElement(trustboxRef);
  }
}