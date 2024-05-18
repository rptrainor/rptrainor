type Header = {
  type: 'header';
  text: string;
};

type Paragraph = {
  type: 'paragraph';
  text: string;
};

type Image = {
  type: 'image';
  src: string;
  text: string;
};

type Link = {
  type: 'link';
  text: string;
  url: string;
};

type Code = {
  type: 'code';
  text: string;
}

export type PostType = {
  title: string;
  description: string | undefined;
  date: string;
  slug: string;
  steps: (Header | Paragraph | Image | Link | Code)[];
};

export const Posts = [
  {
    title: 'Improve Shaan Puri\'s Blog',
    description: "How to Rebuild Shaan Puri's Blog with Laravel, Cloudflare, Nuxt, Vue, and Tailwind, so that the Home Page Loads in 1/3rd of the Time",
    date: '2024-05-16',
    slug: 'improve-shaan-puri-blog',
    steps: [
      {
        type: 'header',
        text: "Hosting on Cloudflare and reducing clientside compute is your path to success",
      },
      {
        type: 'paragraph',
        text: "first, create a new web app with your framework of choice. I used Nuxt for this one, but Astro and Solid is a good combo too with thier island architecture"
      },
      {
        type: 'code',
        text: "pnpm create cloudflare@latest NAME_OF_YOUR_APP",
      },
      {
        type: 'paragraph',
        text: "download any fonts locally. You want to minimize the requests that your app makes to external services"
      },
      {
        type: 'paragraph',
        text: "TailwindCSS is your best choice for CSS. You get the smallest possible bundle size with Tailwind's optimizations"
      },
      {
        type: 'paragraph',
        text: "look for opportunities to offload tasks to the server"
      },
      {
        type: 'paragraph',
        text: "for example, I replaced the Beehiiv forms that were slow loading iframes with HTML, CSS, and a POST request to our server"
      },
      {
        type: 'paragraph',
        text: "run your page through Google's Pagespeed Insights test, and look for areas that you can improve"
      },
      {
        type: 'paragraph',
        text: "convert your images to WebP format, and serve the correct image dimensions for different screen sizes"
      },
      {
        type: 'paragraph',
        text: "to avoid layout shifts, set HTML elements to have fixed heights and widths"
      },
      {
        type: 'paragraph',
        text: "also, think about server side rendering or what is the most graceful way you can handle any loading state"
      },
      {
        type: 'header',
        text: "And those are the tips that I have for building a fast loading web app"
      },
      {
        type: 'header',
        text: "Get the data as close as possible to the client"
      },
      {
        type: 'header',
        text: "Reduce the amount of clientside compute, and network requests"
      },
      {
        type: 'header',
        text: "This is the way to build a fast loading web app"
      },
      {
        type: 'link',
        text: "see a live example of the rebuilt app here:",
        url: 'https://shaan-nuxt.pages.dev',
      },
      {
        type: 'link',
        text: "check out the code for the clientside app here:",
        url: 'https://github.com/rptrainor/shaan-nuxt',
      }
    ]
  },
  {
    title: 'Deploy a RESTful Laravel Server',
    description: 'How to Deploy a Laravel Web Server',
    date: '2024-05-15',
    slug: 'deploy-a-laravel-server',
    steps: [
      {
        type: 'header',
        text: "Let's start by creating a basic Laravel app",
      },
      {
        type: 'paragraph',
        text: 'first you need to have PHP and Composer are installed on your local machine. Then'
      },
      {
        type: 'code',
        text: "composer create-project laravel/laravel laravel-api && cd laravel-api && php artisan serve",
      },
      {
        type: 'header',
        text: "Now, let's create your RESTful API",
      },
      {
        type: 'paragraph',
        text: "start with thinking about what data you want to store in your database with this API and what opperations you want to perform on that data"
      },
      {
        type: 'paragraph',
        text: "now that you know what data you want to store, you can create models and a schema to represent that data. I used the plural here, but I reccomend starting with a single model and table, and then adding more as you need them"
      },
      {
        type: 'code',
        text: "php artisan make:model NAME_OF_YOUR_MODEL_HERE -m",
      },
      {
        type: 'paragraph',
        text: 'this will create a new model in `app/models`, and a new migration file in `database/migrations`. In your new migration file, update the `up` function, with the properties of your new table that you defined in your schema'
      },
      {
        type: 'header',
        text: 'Double check your migration file, model, and schema, and then run the migration to create the table in your database'
      },
      {
        type: 'code',
        text: "php artisan migrate",
      },
      {
        type: 'header',
        text: 'Create a controller for your model',
      },
      {
        type: 'code',
        text: 'php artisan make:controller NAME_OF_YOUR_CONTROLLER_HERE'
      },
      {
        type: 'paragraph',
        text: 'now you have a new controller file in `app/\Http/\Controllers/\ \`. You can update and add methods to this controller to define the business logic for your API routes'
      },
      {
        type: 'paragraph',
        text: "think about CRUD: create, read, update, and delete. Think about what opperations that you want to perform on the data you are storing in your database. And then define the methods in your controller that will perform those opperations"
      },
      {
        type: 'header',
        text: 'Define your API routes'
      },
      {
        type: 'paragraph',
        text: 'in `routes/api.php` you can define the routes for your API. You can use the `Route::get`, `Route::post`, `Route::put`, and `Route::delete` methods to define the routes for your API. These methods generally match with CRUD actions or Create, Read, Update, and Delete'
      },
      {
        type: 'header',
        text: 'Test your new Laravel API'
      },
      {
        type: 'paragraph',
        text: "you can test your new Laravel API by running `php artisan serve` and then making requests to the routes you defined in `routes/api.php`. You can use a tool like Postman to make requests to your API"
      },
      {
        type: 'header',
        text: 'Deploy the Laravel Web Server'
      },
      {
        type: 'paragraph',
        text: "there are a variety of ways to deploy your Laravel web server. Laravel Vapor is a serverless option that is supported by the Laravel team. Laravel Forge is a serverful option that is also supported by the Laravel team. You can also deploy your Laravel app on services like Digital Ocean, Fly.io, or shared storage."
      },
      {
        type: 'link',
        text: "check out the code for the Laravel RESTful API server here:",
        url: 'https://github.com/rptrainor/shaan-api',
      }
    ]
  },
  {
    title: 'Deploy Nuxt on Cloudflare Pages',
    description: 'How to Create a Nuxt App on Cloudflare Pages',
    date: '2024-05-14',
    slug: 'deploy-nuxt-on-cloudflare-pages',
    steps: [
      {
        type: 'header',
        text: "Create a Nuxt App with Cloudflare Pages",
      },
      {
        type: 'code',
        text: "pnpm create cloudflare@latest NAME_OF_YOUR_APP"
      },
      {
        type: 'paragraph',
        text: 'in the terminal select the `Website or web app` option, and then select the `Nuxt` option. This will create a new Nuxt app in the current directory'
      },
      {
        type: 'paragraph',
        text: 'when you are asked in the terminal, `Do you want to deploy your application?` select `Yes`'
      },
      {
        type: 'code',
        text: 'cd NAME_OF_YOUR_APP'
      },
      {
        type: 'paragraph',
        text: 'run the development server'
      },
      {
        type: 'code',
        text: 'pnpm run dev'
      },
      {
        type: 'paragraph',
        text: 'deploy your application'
      },
      {
        type: 'code',
        text: 'pnpm run deploy'
      },
      {
        type: 'header',
        text: "Set any environment variables",
      },
      {
        type: 'paragraph',
        text: "you can set any environment variables in the Cloudflare Pages dashboard. These environment variables will be available to your Nuxt app at runtime"
      },
      {
        type: 'header',
        text: "Optimize images and videos",
      },
      {
        type: 'paragraph',
        text: "Cloudflare Images and Cloudflare Stream can be used to optimize images and videos",
      },
      {
        type: 'header',
        text: "Use Cloudflare Workers to cache responses",
      },
      {
        type: 'paragraph',
        text: "Cloudflare Workers can be used to cache responses, and serve them from the edge network, so that the server doesn't have to do heavy lifting"
      },
      {
        type: 'header',
        text: "Connect your Nuxt app to a database",
      },
      {
        type: 'paragraph',
        text: "Cloudflare D1 database is a SQLite database that can be used to store data for your Nuxt app"
      },
      {
        type: 'paragraph',
        text: "connect your Nuxt app to the Cloudflare D1 database by setting the `DATABASE_URL` environment variable in the Cloudflare Pages dashboard"
      },
      {
        type: 'paragraph',
        text: "Enjoy your new Nuxt app on Cloudflare Pages. You now have a web app that is fast, secure, and scalable"
      },
      {
        type: 'link',
        text: "see a live example of the rebuilt app here:",
        url: 'https://shaan-nuxt.pages.dev',
      },
      {
        type: 'link',
        text: "check out the code for the clientside app here:",
        url: 'https://github.com/rptrainor/shaan-nuxt',
      },
      {
        type: 'link',
        text: "you can see the Cloudflare Worker that we use as a cache layer here:",
        url: 'https://github.com/rptrainor/shaan-cloudflare-worker',
      }
    ]
  }
] as PostType[];

export const PostsDictionary: { [key: string]: PostType } = Posts.reduce((acc, post) => {
  acc[post.slug] = post;
  return acc;
}, {} as { [key: string]: PostType });
