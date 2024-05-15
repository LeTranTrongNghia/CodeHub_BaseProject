const PreviewLanding = () => {
    return <div class="pb-6 sm:pb-16">
        <div class="container max-w-7xl">
            <div
                class="rounded-xl md:bg-muted/10 md:p-3 md:ring-1 md:ring-inset md:ring-border"
            >
                <div
                    class="relative aspect-video overflow-hidden rounded-xl"
                >
                    <img class="w-full h-full object-cover object-center" src="/src/assets/Preview.png" alt="preview landing" loading="eager" />
                </div>
            </div>
        </div>
    </div>
};

export default PreviewLanding;