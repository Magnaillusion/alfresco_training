function main() {
    var json = remote.call("/flatirons/javacopyrightedimages");

    if (json.status == 200) {
        obj = eval("(" + json + ")");
        model.result = eval("(" + json + ")");
    } else {
        obj = eval("(" + json + ")");
        obj.name = "Error";
        model.result = obj;
    }
}

main();
