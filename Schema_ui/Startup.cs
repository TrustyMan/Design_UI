using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Schema_ui.Startup))]
namespace Schema_ui
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
