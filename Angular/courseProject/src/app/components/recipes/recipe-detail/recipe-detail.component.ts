import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    /* this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.recipe = this.recipeService.getRecipe(id);
      }
    ); */
    this.route.data.subscribe(
      (data: Data) => {
        this.recipe = data['recipeDetail']
      }
    );
  }

  toShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
