import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AddShoppingPage } from './../add-shopping/add-shopping';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: AngularFireList<ShoppingItem>;
  shoppingItems;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.shoppingListRef$ = database.list('/shopping-list');
    this.shoppingItems = this.shoppingListRef$.valueChanges();

    this.shoppingItems = this.shoppingListRef$.snapshotChanges().map(
      action => {
        var items = [];
        action.forEach(element => {
          let key = element.key;
          items.push({ key, ...element.payload.val() });
        });
        return items;
      });
  }


  deleteOnClick(item) {
    this.shoppingListRef$.remove(item.key);
    // console.log(item.key);
  }

  update(item){
    this.database.object('/shopping-list/'+item.key).update({
      itemName: "Pizza",
      itemNumber: 12,
      other: "other stuff"
    });
  }

  navigateToAddShoppingPage() {
    this.navCtrl.push(AddShoppingPage);
  }

}
