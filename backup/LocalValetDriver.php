<?php

class LocalValetDriver extends \Valet\Drivers\ValetDriver
{
    /**
     * Determine if the driver serves the request.
     */
    public function serves(string $sitePath, string $siteName, string $uri): bool
    {
        return file_exists($sitePath . '/index.php') && file_exists($sitePath . '/bootstrap/app.php');
    }

    public function isStaticFile(string $sitePath, string $siteName, string $uri): ?string
    {
        // 1. First check if it's in the public folder (common Laravel assets)
        if (file_exists($staticFilePath = $sitePath . '/public' . $uri) && is_file($staticFilePath)) {
            return $staticFilePath;
        }

        // 2. Then check if it's in the root folder (like manifest.json or other files)
        // We exclude .php files to prevent them from being served as plain text
        if (file_exists($staticFilePath = $sitePath . $uri) && is_file($staticFilePath)) {
            $extension = pathinfo($staticFilePath, PATHINFO_EXTENSION);
            if ($extension !== 'php') {
                return $staticFilePath;
            }
        }

        return null;
    }

    /**
     * Get the fully resolved path to the application's front controller.
     */
    public function frontControllerPath(string $sitePath, string $siteName, string $uri): ?string
    {
        return $sitePath . '/index.php';
    }
}
