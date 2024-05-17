type StepType = {
  title: string | undefined
  description: string | undefined

}
export type PostType = {
  title: string
  description: string | undefined
  date: string
  slug: string
  steps: StepType[]
};

export const Posts = [
  {
    title: 'Improve Shaan Puri\'s Blog',
    description: "How to Rebuild Shaan Puri's Blog with Laravel, Cloudflare, Nuxt, Vue, and Tailwind, so that the Home Page Loads in 1/3rd of the Time",
    date: '2024-05-16',
    slug: 'improve-shaan-puri-blog',
    steps: [
      {
        title: "Rebuild the pages with Nuxt, TailwindCSS, and Vue, on Cloudflare Pages",
        description: "Hosting your clientside app on Cloudflare Pages allows you to take advantage of their global CDN, and their edge network, which can reduce latency between your client and the server"
      },
      {
        title: "Offload as much as possible to Cloudflare Workers or a Laravel Server",
        description: "Cloudflare Workers can be used to offload the server from doing heavy lifting, and can be used to cache responses, and serve them from the edge network"
      },
      {
        description: "Analytics, and other third party scripts can be offloaded to Cloudflare Workers, so that they don't slow down the page load time"
      },
      {
        title: "Check Google's Pagespeed Insights test for opportunities to improve",
        description: "Google's Pagespeed Insights test can give you a list of opportunities to improve your site's performance, and can give you a list of things that you can do to improve your site's performance"
      },
      {
        title: 'Image optimization is a must, convert images to WebP format and make sure that you are serving the right size images for the device',
        description: "Images can be a major contributor to the page load time, so it's important to make sure that they are optimized, and that you are serving the right size images for the device"
      }
    ]

  },
  {
    title: 'Deploy a Laravel Server',
    description: 'How to Deploy a Laravel Web Server',
    date: '2024-05-15',
    slug: 'deploy-a-laravel-server',
    steps: [
      {
        title: "Create a Laravel App",
        description: "From the command line run `composer create-project laravel/laravel` to create a new Laravel app"
      },
      {
        title: "Connect your database",
        description: "Update the .env file with your database credentials. Then, update config/database.php with your database connection settings"
      },
      {
        title: "Create the models",
        description: "Make sure you look up what are best practices and the specific syntax for creating models with the specific syntax that your choosen database uses, MySQL, Postgres, SQLite, etc."
      },
      {
        title: "Update migration files",
        description: "Update the migration files in the database/migrations folder to match the schema of the tables you want to create. Then, run `php artisan migrate` to create the tables in the database"
      },
      {
        title: "Create the controllers",
        description: "The controllers are where you will define the logic for your routes. You can create a controller by running `php artisan make:controller BookController`"
      },
      {
        title: "Define your API routes",
        description: "In `routes/api.php` you can define the routes for your API. You can use the `Route::get`, `Route::post`, `Route::put`, and `Route::delete` methods to define the routes for your API. These methods generally match with CRUD actions or Create, Read, Update, and Delete"
      },
      {
        title: 'Test your new Laravel API',
        description: "You can test your new Laravel API by running `php artisan serve` and then making requests to the routes you defined in `routes/api.php`. You can use a tool like Postman to make requests to your API"
      },
      {
        title: "Deploy the Laravel Web Server",
        description: "There are a variety of ways to deploy your Laravel web server. Laravel Vapor is a serverless option that is supported by the Laravel team. Laravel Forge is a serverful option that is also supported by the Laravel team. You can also deploy your Laravel app on services like Digital Ocean, Fly.io, or shared storage."
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
        title: "Create a Nuxt App in the terminal",
        description: "Run `pnpm create cloudflare@latest my-nuxt-app -- --framework=nuxt` to create a new Nuxt app and deploy that new app to Cloudflare Pages"
      },
      {
        title: "Set any environment variables",
        description: "You can set any environment variables in the Cloudflare Pages dashboard. These environment variables will be available to your Nuxt app at runtime"
      },
      {
        title: "Optimize images and videos",
        description: "Cloudflare Images and Cloudflare Stream can be used to optimize images and videos",
      },
      {
        title: "Use Cloudflare Workers to cache responses",
        description: "Cloudflare Workers can be used to cache responses, and serve them from the edge network, so that the server doesn't have to do heavy lifting"
      },
      {
        title: "Connect your Nuxt app to a database",
        description: "Cloudflare D1 database is a SQLite database that can be used to store data for your Nuxt app. You can connect your Nuxt app to the Cloudflare D1 database by setting the `DATABASE_URL` environment variable in the Cloudflare Pages dashboard"
      },
      {
        title: "Utilize your Cloudflare Page terminal commands",
        description: "`pnpm run dev` will start a development server for your Nuxt app. `pnpm run build` will build your Nuxt app for production. `pnpm run preview` will start a preview server for your Nuxt app. `pnpm run deploy` will deploy your Nuxt app to Cloudflare Pages"
      }
    ]
  },
  // {
  //   title: 'Speed up Beehiiv form page load',
  //   description: "How to Reduce Your Page Load Time While Still Collecting Beehiiv Subscribers",
  //   date: '2024-05-13',
  //   slug: 'speed-up-beehiiv-form-page-load'
  // },
  // {
  //   title: 'Perfect Core Web Vitals Scores',
  //   description: "How to Get Perfect Core Web Vitals Scores",
  //   date: '2024-05-12',
  //   slug: 'perfect-core-web-vitals-scores'
  // },
  // {
  //   title: 'Deploy Cloudflare Workers',
  //   description: 'How to Deploy a Cloudflare Worker',
  //   date: '2024-05-11',
  //   slug: 'deploy-cloudflare-workers'
  // },
  // {
  //   title: 'Faster Pages with Cloudflare Workers',
  //   description: 'How to Use Cloudflare Workers to Reduce Latency Between Your Client and Backend',
  //   date: '2024-05-10',
  //   slug: 'faster-pages-with-cloudflare-workers'
  // },
  // {
  //   title: "Golden Ratio with TailwindCSS",
  //   description: "How to Create Golden Ratio Layouts with TailwindCSS",
  //   date: '2024-05-09',
  //   slug: 'golden-ratio-with-tailwindcss'
  // }
] as PostType[];

export const PostsDictionary: { [key: string]: PostType } = Posts.reduce((acc, post) => {
  acc[post.slug] = post;
  return acc;
}, {} as { [key: string]: PostType });