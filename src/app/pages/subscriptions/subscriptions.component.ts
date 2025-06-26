import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { injectStripe, StripePaymentElementComponent } from 'ngx-stripe';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { StripeService } from '../../services/stripe.service';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss',
})
export class SubscriptionsComponent implements OnInit, AfterViewInit {
  @ViewChild(StripePaymentElementComponent) paymentElement!: StripePaymentElementComponent;
  plans: any;
  user: any = localStorage.getItem('user');
  currentUser = JSON.parse(this.user).user;

  private readonly _subscriptionService = inject(SubscriptionService);
  private readonly _stripeService = inject(StripeService);
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

  ngOnInit() {
    this.invokeStripe();
    this._getAllSubscriptions();
    if (!this.stripe) {
      console.error('Stripe is not initialized');
    }
  }

  ngAfterViewInit() {
    // Check if paymentElement is initialized properly
    if (!this.paymentElement) {
      console.error('Payment Element is not initialized');
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

  proceedToCheckout(plan: any) {
    this.paying.set(true);
    // Step 1: Create a Checkout Session
    this._stripeService.createCheckoutSession({
      amount: plan.price,
      currency: 'INR',
      userId: this.currentUser._id,
      planId: plan._id,
    }).subscribe({
      next: (response: any) => {
        const sessionId = response.sessionId;
  
        // Step 2: Redirect to Stripe Checkout
        this.stripe.redirectToCheckout({
          sessionId: sessionId,
        }).subscribe((result: any) => {
          if (result.error) {
            alert('Payment failed: ' + result.error.message);
            this.paying.set(false);
          }
          // No need to handle success here; it will be handled by the success URL
        });
      },
      error: (error) => {
        console.error('Error creating checkout session:', error);
        this.paying.set(false);
      },
    });
  }

  private _getAllSubscriptions() {
    this._subscriptionService.getAllSubscriptionPlans().subscribe((response: any) => {
      if (response.success) {
        this.plans = response.data;
      };
    });
  }
}
