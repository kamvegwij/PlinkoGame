export class Physics
{
    #tag = "none"; 
    #gravity = -9.8;
    #friction = 2;
    #collider; // the object we're colliding with;
    constructor(gravity = -9.8, friction = 0.2)
    {
        this.#gravity = gravity;
        this.#friction = friction;
    }

    get_tag()
    {
        return this.#tag;
    }
    set_collider(b)
    {
        this.#collider = b;
    }
    get_collider()
    {
        return this.#collider;
    }

    is_colliding(a, b)
    {
        //returns a bool
    let obj1 = a.getBounds(); let obj2 = b.getBounds();

    let x_intercept = obj1.x + obj2.width > 
    obj2.x && obj1.x < obj2.x + obj2.width;

    let y_intercept = obj1.y + obj2.height > 
    obj2.y && obj1.y < obj2.y + obj2.height;

    if (x_intercept == true && y_intercept == true)
    {
        this.set_collider(b);
        return true;
    }

    else
    {
        return false;
    }
    }

    bounce_object(a, b)
    {
        //get the point where the objects collide and push the ball the opposite

        // angle in degrees
        var angleDeg = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
        
        a.vy -= 0.01;
        a.vy *= 0.2;
        a.y += a.vy;

        //console.log(angleDeg);
    }

    navigate_path(a, x_pos, y_pos)
    {
        
        if (a.x > x_pos && a.y < y_pos)
        {
            a.x -= 0.5;
            a.y += 0.5;
        }

        else if (a.x < x_pos && a.y < y_pos)
        {
            a.x += 0.5;
            a.y += 0.5;
        }
        
        else if (a.x == x_pos && a.y < y_pos)
        {
            a.x += 0;
            a.y += 0.5;
        }
        
        else if (a.x == x_pos && a.y < y_pos)
        {
            a.x += 0.5;
            a.y += 0;
        }
    }
}