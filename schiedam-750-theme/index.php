<?php
get_header();
?>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    header {
        background-color: #333;
        color: #fff;
        padding: 20px;
        font-size: 2em;
    }

    main {
        padding: 20px;
    }

    section {
        margin: 20px 0;
    }

    .button {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        background-color: #0073aa;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
    }

    .button:hover {
        background-color: #005177;
    }

    @media (max-width: 600px) {
        header {
            font-size: 1.5em;
        }

        .button {
            padding: 8px 16px;
        }
    }
</style>
<main>
    <section>
        <h1>Welcome to Schiedam 750 Theme</h1>
        <p>This is a headless theme for WordPress.</p>
        <a href="<?php echo admin_url(); ?>" class="button">Go to Admin Page</a>
    </section>
</main>

<?php 

get_footer();

?>
