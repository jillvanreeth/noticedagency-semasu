<?php
class Controller
{
    protected $basePath;
    protected $twig;
    protected $twig_loader;
    protected $uri;
    protected $template;
    protected $route;

    public function __construct(array $options = array())
    {
        $this->uri = $this->parseUri();
        $this->twig_loader = new Twig_Loader_Filesystem('templates');
        $this->twig = new Twig_Environment($this->twig_loader, array(//  'cache' => '../.cache',
        ));
        $this->route = $this->getRoute($this->uri);
        $this->template = $this->getTemplate($this->uri);
    }
    public function run()
    {
        $body_classes = [];
        $body_classes[] = 'route-' . trim(preg_replace('/[^a-z0-9-]+/', '-', strtolower($this->route)));
        echo $this->twig->render($this->template, ['body_classes' => $body_classes]);
    }
    protected function parseUri()
    {
        global $base_path;
        $path = trim(parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH));
        if (!empty($base_path)) {
            if (strpos($path, $base_path) === 0) {
                $path = substr($path, strlen($base_path));
            }
        }
        return $path;
    }
    protected function getRoute($uri)
    {
        //$uri = str_replace("/","",$uri);
        if ($uri == '' || $uri == '/') {
            return 'index';
        }
        if (!$this->twig_loader->exists($uri . '.html.twig') || in_array($uri, array('footer','header','mail','nav','page','quote-block'), true)) {
            return '404';
        }
        return trim($uri, '/');
    }
    protected function getTemplate($uri)
    {
        //$uri = str_replace("/","",$uri);
        if ($uri == '' || $uri == '/') {
            return './05_buckets/index.html.twig';
        }
        if (!$this->twig_loader->exists('./05_buckets/' . $uri . '.html.twig') || in_array($uri, array(), true)) { //ADD BLOCKS TO ARRAY
            return './05_buckets/404.html.twig';
        } else {
            return './05_buckets/' . $uri . '.html.twig';
        }
    }
}