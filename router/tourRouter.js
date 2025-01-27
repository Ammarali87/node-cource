





router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
.route('/tours-within/:distance/center/:latlng/unit/:unit')
.get(tourController.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi
