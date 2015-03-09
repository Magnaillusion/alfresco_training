<div class="dashlet copyrighted">
    <div class="title">${msg("title.copyrighted")}</div>
    <div class="body">
        <table>
            <tr>
                <th>${msg("th.name")}</th>
                <th>${msg("th.copyright")}</th>
            </tr>

            <#list result.pictures as p>
                <tr>
                    <td>
                        <a href="${url.context}/page/document-details?nodeRef=${p.noderef}">
                         ${p.name}
                        </a>
                    </td>

                    <td>&copy; ${p.copyright!"No Copyright"}</td>
                </tr>
            </#list>
        </table>
    </div>
</div>
