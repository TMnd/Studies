import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import * as fromApp from '../../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ){}

  ngOnInit(): void {
      this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }

  get controls() {
    return (<FormArray> this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    // const newRecipe = new Recipe( -> pode ser substituido por this.recipeForm.value pq o formulario tem a mesma estrutura que o objecto
    //   this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'], 
    //   this.recipeForm.value['imagePath'], 
    //   this.recipeForm.value['ingredients']
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['recipes']);
  }

  onCancel() {
    this.router.navigate(['recipes']);
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  
  onAddIngredient() {
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, , Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDesciption = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      //const recipe = this.recipeService.getRecipe(this.id);
      this.store.select('recipes')
      .pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe,index) => {
            return index === this.id;
          })
        })
      ).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDesciption = recipe.description;
        if (recipe['ingredients']) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, , Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
        }
      })
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDesciption, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
