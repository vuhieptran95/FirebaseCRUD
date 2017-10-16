import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
/**
* Generated class for the AddShoppingPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: AngularFireList<ShoppingItem>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase) {
    this.shoppingItemRef$ = this.database.list('/shopping-list');
  }

  addShoppingItem(shoppingItem: ShoppingItem){
    this.shoppingItemRef$.push(
      {
        itemName: shoppingItem.itemName,
        itemNumber: Number(shoppingItem.itemNumber)
      }
    );
    this.navCtrl.pop();
  }
}
