//"NODES"
let app;
let bucket_node;
let grid_pin_node;
let start_point_node;
let player_node;
let score_text_node; 
let drop_button_node;

//DATA VARIABLES
let score_text = "0";
let player_score = 100; //default score 100, deduct 10

//BOOLEAN
let ball_dropped = false;
let hit_bucket = false; //if collided with bucket
let hit_grid_pin = false; //if collided with grid pins

//DATA STRUCTURES
const array_buckets = [];
const array_bucket_text = ["10", "5", "2", "1", "0", "1", "2", "5", "10"];
const array_grid_pins = [];

// SETTER METHODS

function create_player(pivot, w, h, app_w, app_h) //FUNCTION TO CREATE NEW PLAYER
{
    player_node = PIXI.Sprite.from("/images/player_ball.png");
    player_node.anchor.set(pivot)
    player_node.width = w;
    player_node.height = h;

    player_node.position.set(app_w, app_h);

    player_node.vy = 0;

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

function create_bucket(w, h, app_w, app_h)
{
    bucket_node = PIXI.Sprite.from("images/collect_box.png");
    bucket_node.anchor.set(0.5);
    bucket_node.width = w;
    bucket_node.height = h;
    bucket_node.x = app_w;
    bucket_node.y = app_h;
    array_buckets.push(bucket_node);

    app.stage.addChild(bucket_node);
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
    bucket_text.y = 500;
    app.stage.addChild(bucket_text);
}

function create_game_world()
{
    let bucket_pos = 90; //buckets far left position

    for (let i = 0; i < 9; i++)
    {
        // add the buckets to the game world:
        create_bucket(80, 40, bucket_pos, 500);
        set_bucket_text(bucket_pos, array_bucket_text[i]);
        bucket_pos += 100;
    }

   // set_bucket_text(bucket_score_text);

    create_drop_button();
    create_start_point(45, 45, app.view.width/2, 0); //STARTING POINT

    create_pins(40, 40, 400, 100); //TODO: Algorithm to draw this grid
    create_pins(40, 40, 500, 100);
    create_pins(40, 40, 600, 100);
    create_pins(40, 40, 400, 200);
    create_pins(40, 40, 500, 200);
    create_pins(40, 40, 600, 200);
    create_pins(40, 40, 300, 200);
    create_pins(40, 40, 700, 200);
    create_pins(40, 40, 400, 300);
    create_pins(40, 40, 500, 300);
    create_pins(40, 40, 600, 300);
    create_pins(40, 40, 300, 300);
    create_pins(40, 40, 700, 300);
    create_pins(40, 40, 800, 300);
    create_pins(40, 40, 200, 300);
    create_pins(40, 40, 400, 400);
    create_pins(40, 40, 500, 400);
    create_pins(40, 40, 600, 400);
    create_pins(40, 40, 300, 400);
    create_pins(40, 40, 700, 400);
    create_pins(40, 40, 800, 400);
    create_pins(40, 40, 200, 400);
    create_pins(40, 40, 100, 400);
    create_pins(40, 40, 900, 400);
}

function grid_pins_mechanics()
{
    //in this function I add functionality to the grid pins
    let len = array_grid_pins.length;
    for (let x = 0; x < len; x++)
    {
        
    }
}
function buckets_mechanics()
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
    if (player_node.y <= 500 && player_node.y >= 0)
    {
        drop_button_node.on('pointerdown', function()
        {
            ball_dropped = true
            player_node.y += 100;
            player_score -= 10; //deduct score for dropping ball

        });
    }
}
function _reset_player_pos(pos)
{
    //this function resets the player position to the starting point
    if (player_node.y >= pos && !hit_bucket)
    {
        player_node.position.set(app.view.width/2, 25);
        ball_dropped = false;
    }
}

window.onload = function()
{
    app = new PIXI.Application(
        {
            width: 1000,
            height: 800,
            backgroundColor: 818041}
    );
    document.body.appendChild(app.view);

    //create game world and add nodes:
    create_game_world();
    create_player(0.5, 40, 40, app.view.width/2, 0);
    create_score_text_node(score_text);
    
    drop_player(); 
    grid_pins_mechanics();
    buckets_mechanics();

    app.ticker.add((delta) =>
    {
        score_text_node.text = player_score.toString();

        if (player_score > 0 && ball_dropped == true)
        {
            _reset_player_pos(500);   
        }
        
    });
}