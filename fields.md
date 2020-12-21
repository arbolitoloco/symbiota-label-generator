    		$this->labelFieldArr = array('occid'=>'o.occid', 'collid'=>'o.collid', 'catalogNumber'=>'o.catalognumber', 'otherCatalogNumbers'=>'o.othercatalognumbers', 'family'=>'o.family',
    			'scientificName'=>'o.sciname AS scientificname', 'scientificName_with_author'=>'CONCAT_WS(" ",o.sciname,o.scientificnameauthorship) AS scientificname_with_author',
    			'speciesName'=>'TRIM(CONCAT_WS(" ",t.unitind1,t.unitname1,t.unitind2,t.unitname2)) AS speciesname', 'taxonRank'=>'t.unitind3 AS taxonrank',
    			'infraSpecificEpithet'=>'t.unitname3 AS infraspecificepithet', 'scientificNameAuthorship'=>'o.scientificnameauthorship', 'parentAuthor'=>'"" AS parentauthor','identifiedBy'=>'o.identifiedby',
    			'dateIdentified'=>'o.dateidentified', 'identificationReferences'=>'o.identificationreferences', 'identificationRemarks'=>'o.identificationremarks', 'taxonRemarks'=>'o.taxonremarks',
    			'identificationQualifier'=>'o.identificationqualifier', 'typeStatus'=>'o.typestatus', 'recordedBy'=>'o.recordedby', 'recordNumber'=>'o.recordnumber', 'associatedCollectors'=>'o.associatedcollectors',
    			'eventDate'=>'DATE_FORMAT(o.eventdate,"%e %M %Y") AS eventdate', 'year'=>'o.year', 'month'=>'o.month', 'day'=>'o.day', 'monthName'=>'DATE_FORMAT(o.eventdate,"%M") AS monthname',
    			'verbatimEventDate'=>'o.verbatimeventdate', 'habitat'=>'o.habitat', 'substrate'=>'o.substrate', 'occurrenceRemarks'=>'o.occurrenceremarks', 'associatedTaxa'=>'o.associatedtaxa',
    			'dynamicProperties'=>'o.dynamicproperties','verbatimAttributes'=>'o.verbatimattributes', 'behavior'=>'behavior', 'reproductiveCondition'=>'o.reproductivecondition', 'cultivationStatus'=>'o.cultivationstatus',
    				'establishmentMeans'=>'o.establishmentmeans','lifeStage'=>'lifestage','sex'=>'sex','individualCount'=>'individualcount','samplingProtocol'=>'samplingprotocol','preparations'=>'preparations',
    			'country'=>'o.country', 'stateProvince'=>'o.stateprovince', 'county'=>'o.county', 'municipality'=>'o.municipality', 'locality'=>'o.locality', 'decimalLatitude'=>'o.decimallatitude',
    			'decimalLongitude'=>'o.decimallongitude', 'geodeticDatum'=>'o.geodeticdatum', 'coordinateUncertaintyInMeters'=>'o.coordinateuncertaintyinmeters', 'verbatimCoordinates'=>'o.verbatimcoordinates',
    			'elevationInMeters'=>'CONCAT_WS(" - ",o.minimumelevationinmeters,o.maximumelevationinmeters) AS elevationinmeters', 'verbatimElevation'=>'o.verbatimelevation',
    			'minimumDepthInMeters'=>'minimumdepthinmeters', 'maximumDepthInMeters'=>'maximumdepthinmeters', 'verbatimDepth'=>'verbatimdepth',
        'disposition'=>'o.disposition', 'storageLocation'=>'storagelocation', 'duplicateQuantity'=>'o.duplicatequantity', 'dateLastModified'=>'o.datelastmodified');

'occid',
'collid',
'catalogNumber',
'otherCatalogNumbers',
'family',
'scientificName',
'taxonRank',
'infraSpecificEpithet',
'scientificNameAuthorship',
'parentAuthor',
'identifiedBy',
'dateIdentified',
'identificationReferences',
'identificationRemarks',
'taxonRemarks',
'identificationQualifier',
'typeStatus',
'recordedBy',
'recordNumber',
'associatedCollectors',
'eventDate',
'year',
'month',
'monthName'
'day',
'verbatimEventDate',
'habitat',
'substrate',
'occurrenceRemarks',
'associatedTaxa',
'dynamicProperties',
'verbatimAttributes',
'behavior',
'reproductiveCondition',
'cultivationStatus',
'establishmentMeans',
'lifeStage',
'sex',
'individualCount',
'samplingProtocol',
'preparations',
'country',
'stateProvince',
'county',
'municipality',
'locality',
'decimalLatitude',
'decimalLongitude',
'geodeticDatum',
'coordinateUncertaintyInMeters',
'verbatimCoordinates',
'elevationInMeters',
'verbatimElevation',
'minimumDepthInMeters',
'maximumDepthInMeters',
'verbatimDepth',
'disposition',
'storageLocation',
'duplicateQuantity',
'dateLastModified'