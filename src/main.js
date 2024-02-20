import {Physics} from './physics.js';
import {GameWorld} from './gameworld.js';

//"NODES"
let app;
let slot_node;
let grid_pin_node;
let start_point_node;
let player_node;
let score_text_node; 
let drop_button_node;

//DATA VARIABLES
let score_text = "0";
let player_score = 100; //default score 100, deduct 10
let SPEED = 1.5;
let player_test_pos;
let slot_test_pos;
let temp;
let temp_collider;
let rand_Num;
let rand_Limit;
let high_val_count = 0; //count how many high value slots have been chosen

//BOOLEAN
let ball_dropped = false;
let hit_slot = false; //if collided with bucket
let hit_grid_pin = false; //if collided with grid pins

//DATA STRUCTURES
const array_buckets = [];
const array_slot_text = [10, 5, 2, 1, 0, 1, 2, 5, 10];
const array_grid_pins = [];
const slots_x_pos = [];
const slots_y_pos = [];

const pin_x_pos = [];
const pin_y_pos = [];

// OBJECTS
const physics = new Physics();

// SETTER METHODS

function create_player(w, h, app_w, app_h) //FUNCTION TO CREATE NEW PLAYER
{
    player_node = PIXI.Sprite.from("/images/player_ball.png");
    player_node.anchor.set(0.5, 0.5)
    player_node.width = w;
    player_node.height = h;

    player_node.position.set(app_w, app_h);

    player_node.vy = 0;
    player_node.vx = 0;

    player_node.interactive = true; //allows input events

    app.stage.addChild(player_node)
}

function create_score_text_node(t)
{
    const text_style = new PIXI.TextStyle({
        fontSize: 40
    });

    score_text_node = new PIXI.Text(t.toString(), text_style);
    app.stage.addChild(score_text_node);
}

function create_slots(w, h, app_w, app_h)
{
    slot_node = PIXI.Sprite.from("images/collect_box.png");
    slot_node.anchor.set(0.5);
    slot_node.width = w;
    slot_node.height = h;
    slot_node.x = app_w;
    slot_node.y = app_h;
    array_buckets.push(slot_node);

    app.stage.addChild(slot_node);
}

function create_start_point(w, h, app_w, app_h)
{
    start_point_node = PIXI.Sprite.from("images/player_start_point.png");

    start_point_node.width = w;
    start_point_node.height = h;
    start_point_node.x = app_w;
    start_point_node.y = app_h;
    
    app.stage.addChild(start_point_node);
}

function create_pins(w, h, app_w, app_h)
{

    // WE WILL USE THE STAR PATTERN ALGORITHM TO SET THE PINS IN GRID SHAPE
    grid_pin_node = PIXI.Sprite.from("images/pins.png");

    grid_pin_node.width = w;
    grid_pin_node.height = h;
    grid_pin_node.x = app_w;
    grid_pin_node.y = app_h;
    array_grid_pins.push(grid_pin_node);
    app.stage.addChild(grid_pin_node);
}

function create_drop_button()
{
    drop_button_node = PIXI.Sprite.from("images/playbtn.png");
    drop_button_node.anchor.set(0.5);
    drop_button_node.width = 200;
    drop_button_node.height = 80;
    drop_button_node.x = app.view.width/2;
    drop_button_node.y = 650;
    drop_button_node.interactive = true;
    app.stage.addChild(drop_button_node);
}
function set_bucket_text(pos_x, stemp)
{//function to change bucket score text
    const b_style = new PIXI.TextStyle({
        fontSize: 20
    });

    const bucket_text = new PIXI.Text(stemp.toString(), b_style);
    bucket_text.anchor.set(0.5);
    bucket_text.x = pos_x;
    bucket_text.y = 520;
    app.stage.addChild(bucket_text);
}

function create_game_world()
{
    let slot_pos = 90; //buckets far left position

    for (let i = 0; i < 9; i++)
    {
        create_slots(80, 40, slot_pos, 520);

        set_bucket_text(slot_pos, array_slot_text[i]);
        slots_x_pos.push(slot_node.x); //keep track of the position of the slots.
        slots_y_pos.push(slot_node.y);

        //console.log(slots_x_pos[i]);
        slot_pos += 100;
    }
    

   // set_bucket_text(bucket_score_text);

    create_drop_button();
    create_start_point(45, 45, app.view.width/2, 0); //STARTING POINT
    
    create_pins(60, 60, 400, 100); //TODO: Algorithm to draw this grid
    create_pins(60, 60, 500, 100);
    create_pins(60, 60, 600, 100);
    create_pins(60, 60, 420, 200);
    create_pins(60, 60, 530, 200);
    create_pins(60, 60, 630, 200);
    create_pins(60, 60, 300, 200);
    create_pins(60, 60, 720, 200);

    create_pins(60, 60, 400, 300); //
    create_pins(60, 60, 500, 300); //
    create_pins(60, 60, 600, 300); //
    create_pins(60, 60, 300, 300);
    create_pins(60, 60, 700, 300);
    create_pins(60, 60, 800, 300);
    create_pins(60, 60, 200, 300);
    create_pins(60, 60, 400, 400);
    create_pins(60, 60, 500, 400);
    create_pins(60, 60, 600, 400);
    create_pins(60, 60, 300, 400);
    create_pins(60, 60, 700, 400);
    create_pins(60, 60, 800, 400);
    create_pins(60, 60, 200, 400);
    create_pins(60, 60, 100, 400);
    create_pins(60, 60, 900, 400);

    for (let x = 0; x < array_grid_pins.length; x++)
    {
        pin_x_pos.push(array_grid_pins[x].x);
        pin_y_pos.push(array_grid_pins[x].y); //keep track of the positions of the pins/pegs.
    }
}

function grid_pins_mechanics()
{
    //in this function I add functionality to the grid pins
    let len = array_grid_pins.length;
    for (let x = 0; x < len; x++)
    {
        if (physics.is_colliding(player_node, array_grid_pins[x]))
        {
           // hit_grid_pin = true;
            physics.bounce_object(player_node, array_grid_pins[x]);
        }
    }
}

function slots_mechanics()
{
    //in this function I add functionality to the score buckets:
    let len = array_buckets.length;
    for (let x = 0; x < len; x++)
    {
        
    }
}

//GAME MECHANICS
function drop_player()
{
    //develop an algorithm to guide player passed the pins.

    drop_button_node.on('pointerdown', function()
    {
        rand_Limit = Math.floor(Math.random() * (Math.floor(5) - Math.ceil(0) + 1) + Math.ceil(2)); //randomise how many tries it will take to get a high value slot.
        rand_Num = Math.floor(Math.random() * (Math.floor(9) - Math.ceil(0) + 1) + Math.ceil(0));
        
        if (rand_Num == 0 || rand_Num == 1 || rand_Num == 8 || rand_Num == 9)
        {
            high_val_count += 1; //increase the amount of times we get high value slots.
        }

        if (high_val_count >= 0)
        {
            ball_dropped = true
        }
        console.log(rand_Limit);
        console.log(rand_Num);
        
    });
}

function _reset_player_pos()
{
    if (player_score > 10)
    {
        player_score -= 10; //deduct 10 points for playing
    } 
    
    //this function resets the player position to the starting point
    SPEED = 1.5;
    player_node.position.set(app.view.width/2, 25);
    ball_dropped = false;
}

function choose_slot()
{
    //make higher value slots less likely to be chosen
    physics.navigate_path(player_node, slots_x_pos[rand_Num], slots_y_pos[rand_Num]);
}

window.onload = function()
{
    app = new PIXI.Application(
        {
            width: 1000,
            height: 800,
            backgroundColor: 'gray'}
    );
    document.body.appendChild(app.view);

    //create game world and add nodes:
    create_game_world();
    create_player(40, 40, app.view.width/2, 0);
    create_score_text_node(score_text);
    app.ticker.add(gameLoop);

    //text nodes for testing:
   /* player_test_pos = new PIXI.Text();
    player_test_pos.position.set(100, 200);
    app.stage.addChild(player_test_pos)

    slot_test_pos = new PIXI.Text();
    slot_test_pos.position.set(100, 300);
    app.stage.addChild(slot_test_pos)*/

    
    /*temp = PIXI.Sprite.from("images/player_ball.png");
    temp.anchor.set(0.5, 0.5);
    temp.width = 50;
    temp.height = 50;
    temp.vy = 0;
    temp.vx = 0;
    temp.x = app.view.width/2 - 200;
    temp.y = app.view.height - 200;
    app.stage.addChild(temp);
    */
    drop_player();
}



function gameLoop()
    {
       // player_test_pos.text = player_node.x.toString() + ",  " + player_node.y.toString();
       // slot_test_pos.text = slots_x_pos[6].toString() + ",  " + slots_y_pos[6].toString();
       

       
        if (ball_dropped == true)
        {
            choose_slot();
            grid_pins_mechanics();
            slots_mechanics();
        }
        
        score_text_node.text = player_score.toString();
        add_score_from_slot();   
    }

function add_score_from_slot()
{
    let counter = 0;
    for (let x = 0; x < array_buckets.length; x++)
    {
        if (physics.is_colliding(player_node, array_buckets[x]))
        {
            player_score += array_slot_text[counter];
            _reset_player_pos()
            break; //break out of the loop.
        }
        else { counter++; }
        //check which slot the player has landed on
        
    }
}