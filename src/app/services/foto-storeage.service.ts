import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FotoStoreageService {

  constructor(
    private angStorage: AngularFireStorage,
  ) { }

  //SELECCIONAR FOTOS DEL DISPOSITIVO, SUBIR FOTOS Y OBTENCION DE ENLACES EN FIRE STORAGE
  cargarFotoFireStorage(archivo:any, ruta:any, nombreFoto:string): Promise<string>{
    return new Promise(resolve=>{
      const rutaArchivo= ruta+'/'+ nombreFoto;
      const referencia = this.angStorage.ref(rutaArchivo);
      const task= referencia.put(archivo);
      task.snapshotChanges().pipe(
        finalize(()=>{
          // const downloadURL = referencia.getDownloadURL();
          //OBTENCION ENLACE PARA ABRIR IMAGEN
          referencia.getDownloadURL().subscribe(res=>{
            const downloadURL = res;
            resolve(downloadURL);
            return;
          });
        })
      ).subscribe();
    })
  }


}
