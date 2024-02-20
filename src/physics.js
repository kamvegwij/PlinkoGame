export class Physics
{
    #tag = "none"; 
    #gravity = -9.8;
    #friction = 2;

    constructor(gravity = -9.8, friction = 0.2)
    {
        this.#gravity = gravity;
        this.#friction = friction;
    }

    get_tag()
    {
        return this.#tag;
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

        a.y += a.vy;
        a.x += a.vx;

        a.vy += 0.2;
        a.vx += 0.05;

        if (angleDeg >= 0 && angleDeg < 90)
        {
            a.vy *= -0.7;
            a.vx *= 0.7;
            a.y += a.vy;
            a.x += a.vx;
        }
        else if (angleDeg >= 90 && angleDeg < 180)
        {
            a.vy *= -2;
            a.vx *= -0.7;
            a.y += a.vy;
            a.x += a.vx;
        }
        if (angleDeg >= 180 && angleDeg < 270)
        {
            a.vy *= 2;
            a.vx *= -0.7;
            a.y += a.vy;
            a.x += a.vx;
        }
        if (angleDeg >= 270 && angleDeg < 360)
        {
            a.vy *= 0.7;
            a.vx *= 0.7;
            a.y += a.vy;
            a.x += a.vx;
        }
        

        console.log(angleDeg);
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