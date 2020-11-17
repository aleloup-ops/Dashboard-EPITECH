from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

import json

from firebase_admin import auth
from firebase_admin import firestore

db = firestore.client()

# Create your views here.

"""
    @ POST
"""
@api_view(['POST'])
def createOrUpdate_widget(request):

    data = {
        'position': request.data['position'],
        'params': request.data['params'],
        'service': request.data['service'],
        'type': request.data['type'],
        'id_widget': request.data['id_widget']
    }

    doc_ref = db.collection(u'widgets').document(request.data['uid'])

    doc_ref.set({ 'widget': firestore.ArrayUnion([data]) }, merge=True)

    return JsonResponse({'status': 'OK'}, status=status.HTTP_200_OK)


"""
    @ GET ALL WIDGET OF THE USER_ID
"""
@api_view(['GET'])
def get_widget(request, user_id):

    doc_ref = db.collection(u'widgets').document(user_id)

    doc = doc_ref.get()

    if doc.exists:
        print(f'Document data: {doc.to_dict()}')

        return JsonResponse(doc.to_dict(), status=status.HTTP_200_OK)
    else:
        print(u'No such document!')

    return JsonResponse({ 'error': 'RESSOURCE NOT FOUND' }, status=status.HTTP_404_NOT_FOUND)


"""

"""
@api_view(['POST'])
def update_params(request, user_id, widget_id):

    doc_ref = db.collection(u'widgets').document(user_id)

    doc = doc_ref.get()

    if not doc.exists:
        return JsonResponse({ 'error': 'RESSOURCE NOT FOUND' }, status=status.HTTP_404_NOT_FOUND)

    data = doc.to_dict()

    for wid in data['widget']:
        if wid['id_widget'] == widget_id:
            doc_ref.update({'widget': firestore.ArrayRemove([wid])})

    new_data = {
        'position': request.data['position'],
        'params': request.data['params'],
        'service': request.data['service'],
        'type': request.data['type'],
        'id_widget': request.data['id_widget']
    }

    doc_ref.set({ 'widget': firestore.ArrayUnion([new_data]) }, merge=True)

    return JsonResponse({'status': 'OK'}, status=status.HTTP_200_OK)
