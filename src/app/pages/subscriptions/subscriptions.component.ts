import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { injectStripe, StripePaymentElementComponent } from 'ngx-stripe';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment.development';
import { StripeService } from '../../services/stripe.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss',
})
export class SubscriptionsComponent implements OnInit, AfterViewInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  planBenifits = [
    'View unlimited photos',
    'Unlimited messaging',
    "See who's viewed you",
    'Distance search',
    'Detailed personality profile',
  ];
  // elements: any;
  
  private readonly authService = inject(AuthService);
  // private readonly fb = inject(UntypedFormBuilder);
  // private readonly stripeService = inject(StripeService);

  // paymentElementForm = this.fb.group({
  //   name: ['John Doe', [Validators.required]],
  //   email: ['support@ngx-stripe.dev', [Validators.required]],
  //   address: [''],
  //   zipcode: [''],
  //   city: [''],
  //   amount: [2500, [Validators.required, Validators.pattern(/\d+/)]],
  // });

  elementsOptions: any = {
    locale: 'en',
    client: environment.stripeSecreteKey,
    appearance: {
      theme: 'flat',
    },
  };
  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false,
    },
  };

  stripe = injectStripe(environment.stripePublicKey);
  paying = signal(false);
  paymentHandler: any = null;

  ngAfterViewInit() {
    // Check if paymentElement is initialized properly
    if (!this.paymentElement) {
      console.error('Payment Element is not initialized');
    }
  }

  ngOnInit() {
    this.invokeStripe();
    if (!this.stripe) {
      console.error('Stripe is not initialized');
    }
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');

      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: environment.stripePublicKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            alert('Payment has been successfull!');
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: environment.stripePublicKey,
      locale: 'auto',
      token: function (stripeToken: any) {
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'DatingApp.com',
      description: 'find your love',
      amount: amount * 100,
    });
  }

  handleLogin() {
    this.authService.logout();
  }

  // pay(): void {
  //   this.stripeService.createPaymentIntent(200).subscribe(
  //     (response) => {
  //       const clientSecret = response.clientSecret;
  //       if (!clientSecret) {
  //         console.error('Client secret is missing');
  //         return;
  //       }
  
  //       // Assuming you have a Payment Element to attach to the DOM
  //       const paymentElement = this.elements.create('payment');
  //       paymentElement.mount('#payment-element'); // Mount the element to a DOM element with the ID 'payment-element'
  
  //       // Confirm the payment with the clientSecret from the response
  //       this.stripe.confirmPayment({
  //         elements: this.elements,
  //         confirmParams: {
  //           return_url: 'https://your-site.com/payment-success',
  //         },
  //       }).subscribe({
  //         next: (result) => {
  //           if (result.error) {
  //             console.error('Payment failed:', result.error.message);
  //           } else {
  //           }
  //         },
  //         error: (err) => {
  //           console.error('Payment confirmation failed:', err);
  //         },
  //       });
  //     },
  //     (error) => {
  //       console.error('Payment intent creation failed:', error);
  //     }
  //   );    
  // }
}
