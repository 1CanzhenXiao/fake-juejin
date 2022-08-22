let div = "<div class=\"loading-empty\">\n" +
    "        <div class=\"activity-empty shadow\">\n" +
    "            <svg width=\"66\" height=\"68\" viewBox=\"0 0 66 68\" class=\"icon empty-icon\">\n" +
    "                <g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(4 3)\">\n" +
    "                    <g fill=\"#F7F7F7\">\n" +
    "                        <path d=\"M9 10h23.751v3.221H9zM9 16.494h41.083v4.026H9zM9 26.104h23.751v3.221H9zM9 42.208h23.751v3.221H9zM9 33.351h41.083v4.026H9zM9 49.455h41.083v4.026H9z\"></path>\n" +
    "                    </g> \n" +
    "                    <rect width=\"56\" height=\"60\" x=\"1.139\" y=\"1.338\" stroke=\"#EBEBEB\" stroke-width=\"2\" rx=\"6\" class='.rect'></rect>\n" +
    "                </g>\n" +
    "            </svg> \n" +
    "            <span class=\"empty-text\">暂无关注人发布的文章</span>\n" +
    "            <!---->\n" +
    "        </div>\n" +
    "    </div>"
let empty_div = $(div)[0];
$('.entry-list')[0].appendChild(empty_div);